"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { CartItem, ProductDetail, ProductSummary } from "@/types/product";

interface CartContextValue {
  items: CartItem[];
  /** Cantidad total de unidades en el carrito (suma de quantity). */
  count: number;
  /** Precio total del carrito. */
  total: number;
  /** Agrega un producto (catálogo o detalle) al carrito. Si ya existe, suma 1 a su cantidad. */
  addToCart: (product: ProductSummary | ProductDetail) => void;
}

// Se inicia en null a propósito: así useCart() puede detectar si alguien
// intenta consumir el contexto por fuera del CartProvider.
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: ProductSummary | ProductDetail) => {
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
  }, []);

  const { count, total } = useMemo(() => {
    return items.reduce(
      (acc, item) => ({
        count: acc.count + item.quantity,
        total: acc.total + item.quantity * item.price,
      }),
      { count: 0, total: 0 }
    );
  }, [items]);

  const value = useMemo(
    () => ({ items, count, total, addToCart }),
    [items, count, total, addToCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de un <CartProvider>");
  }
  return ctx;
}
