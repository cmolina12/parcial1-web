"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { ProductDetail, ProductSummary } from "@/types/product";

interface AddToCartButtonProps {
  product: ProductSummary | ProductDetail;
  /** Permite reusar el mismo botón con distinto tamaño en la tarjeta y en el detalle. */
  variant?: "compact" | "full";
}

export default function AddToCartButton({ product, variant = "full" }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    addToCart(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }

  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed";
  const sizing = variant === "compact" ? "px-3 py-1.5 text-sm" : "px-5 py-3 text-base";
  const color = justAdded
    ? "bg-emerald-600 text-white"
    : "bg-indigo-600 text-white hover:bg-indigo-700";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={product.stock <= 0}
      className={`${base} ${sizing} ${color}`}
    >
      {product.stock <= 0 ? "Sin stock" : justAdded ? "¡Agregado!" : "Agregar al carrito"}
    </button>
  );
}
