import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

// Server Component: no lleva "use client" porque solo hace fetch y renderiza
// texto/estructura, no necesita estado ni eventos del navegador.
export default async function Home() {
  const products = await getProducts();

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Catálogo</h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          {products.length} productos disponibles, cargados en vivo desde DummyJSON.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
