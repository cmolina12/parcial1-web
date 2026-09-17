"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="rounded-md bg-indigo-600 px-2 py-1 text-sm text-white">SH</span>
          ShopHub
        </Link>

        <div className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium dark:border-white/15">
          🛒 Carrito
          <span
            aria-label={`${count} productos en el carrito`}
            className="flex h-6 min-w-6 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs font-semibold text-white"
          >
            {count}
          </span>
        </div>
      </div>
    </header>
  );
}
