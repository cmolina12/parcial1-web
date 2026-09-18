"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function OrderSummary() {
  const { items, count, total, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-black/15 p-10 text-center dark:border-white/20">
        <p className="text-lg font-semibold">Tu carrito está vacío</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Agrega productos desde el catálogo antes de finalizar la compra.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Resumen de compra</h2>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-medium text-red-600 hover:underline"
        >
          Vaciar carrito
        </button>
      </div>

      <ul className="flex flex-col divide-y divide-black/10 dark:divide-white/10">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- imagen externa de DummyJSON */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-14 w-14 flex-shrink-0 rounded-lg bg-zinc-100 object-cover dark:bg-zinc-800"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.title}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                ${item.price.toFixed(2)} c/u
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={`Disminuir cantidad de ${item.title}`}
                onClick={() => decreaseQuantity(item.id)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15 text-sm font-bold hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                type="button"
                aria-label={`Aumentar cantidad de ${item.title}`}
                onClick={() => increaseQuantity(item.id)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15 text-sm font-bold hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
              >
                +
              </button>
            </div>

            <p className="w-20 flex-shrink-0 text-right text-sm font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              type="button"
              aria-label={`Eliminar ${item.title} del carrito`}
              onClick={() => removeFromCart(item.id)}
              className="flex-shrink-0 px-1 text-zinc-400 hover:text-red-600"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-black/10 pt-4 dark:border-white/10">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">{count} artículo(s)</span>
        <span className="text-xl font-extrabold">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
