import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "ShopHub",
  description: "Catálogo de productos con carrito de compras global (Next.js + React Context)",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        {/*
          CartProvider vive aquí, en el layout raíz. Next.js mantiene montado
          este árbol al navegar entre "/" y "/productos/[id]" (SPA real: solo
          se re-renderiza <children>), por eso el estado del carrito no se
          reinicia al cambiar de vista.
        */}
        <CartProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
