# ShopHub

Plataforma de e-commerce construida con Next.js (App Router) + TypeScript + Tailwind, que consume la API pública de [DummyJSON](https://dummyjson.com) y mantiene un carrito de compras global con React Context.

## Decisiones de Arquitectura y Cambios del Parcial

### Punto 1 - Evolución del Contexto

En el preparcial, `CartContext` solo exponía la operación (`addToCart`) sobre un arreglo de `CartItem` (`{ id, title, price, thumbnail, quantity }`). El modelo de datos en sí no cambió en este parcial, sigue siendo el mismo arreglo de `CartItem` con `quantity`, pero en este caso el contexto ahora expone el conjunto completo de operaciones que un carrito transaccional necesita:

- `increaseQuantity(id)` / `decreaseQuantity(id)`: suman o restan 1 a la cantidad de un ítem existente. `decreaseQuantity` elimina el ítem automáticamente cuando su cantidad llegaría a 0.
- `removeFromCart(id)`: descarta un producto del carrito sin importar su cantidad.
- `clearCart()`: restablece el carrito a `[]`.

La inmutabilidad se garantiza de la misma forma en las cuatro operaciones, ya que nunca se muta `items` ni ningún `CartItem` existente, siempre se construye una estructura nueva:

- `increaseQuantity` usa `.map()` y reemplaza el ítem afectado por un objeto nuevo, mientras los demás ítems se devuelven tal cual (mismas referencias, sin copiarlos innecesariamente).
- `decreaseQuantity` encadena dos pasos, ambos inmutables: primero `.map()` resta 1 a la cantidad del ítem objetivo (construyendo un objeto nuevo, sin tocar el original), y después `.filter()` descarta cualquier ítem cuya cantidad haya quedado en 0 o menos.
- `removeFromCart` usa `.filter()`, que ya devuelve un arreglo nuevo por definición.
- `clearCart` simplemente reemplaza `items` por una referencia `[]` nueva.

En todos los casos se usa la forma funcional de `setItems((prev) => ...)` para no depender de una closure con el `items` de un render anterior (evita condiciones de carrera si dos actualizaciones se disparan muy seguido).

### Punto 2 - Cálculo de Totales

`count` (unidades totales) y `total` (precio acumulado) no se guardan como estado propio: se derivan de `items` en cada render con dos `.reduce()` directos, calculados justo antes de armar el `value` del contexto:

```ts
const count = items.reduce((acc, item) => acc + item.quantity, 0);
const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
```

La razón de no duplicar este dato en un `useState` aparte es evitar que ambas fuentes de verdad (el arreglo `items` y un `total` guardado manualmente) se desincronicen si alguien olvida actualizar una de las dos al agregar/quitar un producto. Al derivarlo siempre de `items`, es matemáticamente imposible que el contador del `Header` o el total del checkout queden desactualizados.

### Punto 3 - Arquitectura del Formulario

El formulario de checkout (`components/checkout/CheckoutForm.tsx`) se implementó como un formulario controlado nativo de React, sin librerías externas : cada campo tiene su `value`/`checked` atado a un objeto de estado (`useState<CheckoutFormState>`) y un `onChange` que lo actualiza de forma inmutable (`setForm((prev) => ({ ...prev, [name]: value }))`), el mismo patrón que ya usa `CartContext` para sus propias actualizaciones.

Decisiones puntuales:

- **Validación derivada, no almacenada**: en vez de guardar los mensajes de error en su propio `useState`, `nameError`/`emailError` se recalculan en cada render a partir del valor actual del formulario, llamando a `validateField(name, value)`. Esto garantiza que `isValid` (y por lo tanto el botón de "Confirmar pedido") siempre refleje el estado real del formulario, sin depender de que el usuario haya salido del campo.
- **Mostrar el error solo se controla con `touched`**: un objeto `useState<{ fullName?: boolean; email?: boolean }>` que se marca en `onBlur`. El mensaje de error (`{touched.email && emailError && <p>...</p>}`) solo se renderiza si el campo fue tocado, separando "¿es válido?" (siempre calculado) de "¿debo mostrar el error?" (solo tras `onBlur`).
- **Envío asíncrono simulado**: `handleSubmit` hace `e.preventDefault()`, activa `isSubmitting` (que deshabilita todos los campos y el botón, evitando doble envío), espera una `Promise` con `setTimeout` para simular la latencia de un backend real, y al resolver llama `clearCart()` del contexto global, resetea el formulario a su estado inicial y muestra una vista de confirmación.

## Inicializar aplicación

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [DummyJSON](https://dummyjson.com) como servicio externo de datos
