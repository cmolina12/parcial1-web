import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";

// Ruta dinámica: app/productos/[id]/page.tsx -> /productos/1, /productos/2, ...
// En Next.js 16 `params` llega como Promise, por eso la función es async y se
// hace `await params` antes de leer `id`.
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
      >
        ← Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 gap-8 rounded-lg border border-black/10 bg-white p-6 sm:grid-cols-2 dark:border-white/10 dark:bg-zinc-900">
        {/* eslint-disable-next-line @next/next/no-img-element -- imagen externa de DummyJSON */}
        <img
          src={product.images?.[0] ?? product.thumbnail}
          alt={product.title}
          className="aspect-square w-full rounded-lg bg-zinc-100 object-cover dark:bg-zinc-800"
        />

        <div className="flex flex-col gap-3">
          <span className="w-fit rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium capitalize text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {product.category}
            {product.brand ? ` · ${product.brand}` : ""}
          </span>

          <h1 className="text-2xl font-bold">{product.title}</h1>

          <p className="text-3xl font-extrabold text-blue-600">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {product.stock > 0 ? `${product.stock} unidades disponibles` : "Sin stock"}
          </p>

          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
            {product.description}
          </p>

          <div className="mt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
