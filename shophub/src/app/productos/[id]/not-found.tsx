import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Producto no encontrado</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        El producto que buscas no existe o fue removido del catálogo.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
      >
        Volver al catálogo
      </Link>
    </div>
  );
}
