"use client";

import { createContext, useContext, useState } from "react";
import type { CartItem, ProductDetail, ProductSummary } from "@/types/product";

interface CartContextValue {
  items: CartItem[];
  // Cantidad total de unidades en el carrito (suma de quantity)
  count: number;
  // Precio total del carrito.
  total: number;
  // Agrega un producto (catálogo o detalle) al carrito. Si ya existe, suma 1 a su cantidad.
  addToCart: (product: ProductSummary | ProductDetail) => void;
  // Suma 1 a la cantidad de un ítem existente.
  increaseQuantity: (id: number) => void;
  // Resta 1 a la cantidad de un ítem; si llega a 0, el ítem se elimina del carrito.
  decreaseQuantity: (id: number) => void;
  // Elimina un producto del carrito sin importar su cantidad.
  removeFromCart: (id: number) => void;
  // Restablece el carrito a su estado inicial vacío.
  clearCart: () => void;
}

// Se inicia en null a propósito: así useCart() puede detectar si alguien
// intenta consumir el contexto por fuera del CartProvider.
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: ProductSummary | ProductDetail) {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);

      if (existing) {
        // Inmutabilidad: nunca se muta el arreglo ni el objeto existente,
        // se construye un arreglo/objeto nuevo para que React detecte el cambio.
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      };
      return [...prevItems, newItem];
    });
  }

  function increaseQuantity(id: number) {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }

  function decreaseQuantity(id: number) {
    setItems((prevItems) =>
      prevItems
        // Primero se resta 1 al ítem objetivo (objeto nuevo, sin mutar el original).
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        // Luego se descarta cualquier ítem que haya quedado en 0 o menos.
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id: number) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const count = items.reduce((acc, item) => acc + item.quantity, 0);
  const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const value: CartContextValue = {
    items,
    count,
    total,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de un <CartProvider>");
  }
  return ctx;
}
