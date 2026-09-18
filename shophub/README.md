# ShopHub

Plataforma de e-commerce con Next.js (App Router), TypeScript y Tailwind. Consume la API de DummyJSON y maneja el carrito con React Context.

## Decisiones de Arquitectura y Cambios del Parcial

### Punto 1 - Evolución del Contexto

El modelo de datos del carrito no cambió (sigue siendo un arreglo de `CartItem` con `quantity`), pero ahora el contexto tiene todas las operaciones que faltaban: `increaseQuantity`, `decreaseQuantity`, `removeFromCart` y `clearCart`.

Todas mantienen la misma regla del preparcial: nunca se muta `items` directamente. `increaseQuantity` usa `.map()` para reemplazar el ítem afectado por uno nuevo. `decreaseQuantity` hace lo mismo pero encadena un `.filter()` después, para sacar del arreglo cualquier ítem que haya quedado en cantidad 0. `removeFromCart` es un `.filter()` simple, y `clearCart` solo reemplaza `items` por `[]`. En todos los casos se usa `setItems((prev) => ...)` en vez de leer `items` directamente, para evitar problemas si dos actualizaciones se disparan casi al mismo tiempo.

### Punto 2 - Cálculo de Totales

`count` y `total` no se guardan en su propio estado: se calculan en cada render con `.reduce()` a partir de `items`.

```ts
const count = items.reduce((acc, item) => acc + item.quantity, 0);
const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
```

La idea es simple: si `total` viviera en su propio `useState`, habría que acordarse de actualizarlo manualmente en cada operación del carrito, y sería fácil que se desincronizara del arreglo real. Calculándolo siempre a partir de `items`, eso no puede pasar.

### Punto 3 - Arquitectura del Formulario

El checkout (`CheckoutForm.tsx`) es un formulario controlado normal de React, sin librerías externas. Cada input tiene su `value` en un `useState<CheckoutFormState>` y un `onChange` que actualiza ese estado con spread (`{ ...prev, [name]: value }`), el mismo patrón que ya usa `CartContext`.

Los errores de nombre y correo (`nameError`, `emailError`) no se guardan en estado: se recalculan en cada render llamando a `validateField`, así el botón siempre sabe si el formulario es válido sin depender de que el usuario haya salido del campo. Lo que sí vive en estado es `touched`, que se marca en `onBlur` y controla si el mensaje de error se muestra o no.

El envío es asíncrono: al hacer submit se activa `isSubmitting` (bloquea el botón y los campos), se espera con un `setTimeout` simulando una petición real, y al terminar se limpia el carrito (`clearCart()`), se resetea el formulario y se muestra la confirmación.

## Inicializar aplicación

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [DummyJSON](https://dummyjson.com)
