import Link from "next/link";
import type { ProductSummary } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <Link href={`/productos/${product.id}`} className="block">
        {/* eslint-disable-next-line @next/next/no-img-element -- imagen externa de DummyJSON, no vale la pena configurar remotePatterns para este alcance */}
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="aspect-square w-full bg-zinc-100 object-cover dark:bg-zinc-800"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="w-fit rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium capitalize text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {product.category}
        </span>

        <Link href={`/productos/${product.id}`} className="line-clamp-2 font-semibold hover:text-blue-600">
          {product.title}
        </Link>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {product.stock > 0 ? `${product.stock} unidades en stock` : "Sin stock"}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <AddToCartButton product={product} variant="compact" />
        </div>
      </div>
    </article>
  );
}
