"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-white dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="rounded-md bg-blue-600 px-2 py-1 text-sm text-white">SH</span>
          ShopHub
        </Link>

        <Link
          href="/checkout"
          className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-white/15"
        >
          🛒 Carrito
          <span
            aria-label={`${count} productos en el carrito`}
            className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white"
          >
            {count}
          </span>
        </Link>
      </div>
    </header>
  );
}
