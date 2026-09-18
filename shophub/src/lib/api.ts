import type { ProductDetail, ProductListResponse, ProductSummary } from "@/types/product";

const API_BASE = "https://dummyjson.com";


export async function getProducts(): Promise<ProductSummary[]> {
  const res = await fetch(
    `${API_BASE}/products?limit=8&select=id,title,price,category,thumbnail,stock`,
    // Sin cache: siempre se pide el catálogo fresco al servidor externo.
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`No se pudo cargar el catálogo (status ${res.status})`);
  }

  const data: ProductListResponse = await res.json();
  return data.products;
}


export async function getProductById(id: string): Promise<ProductDetail | null> {
  const res = await fetch(`${API_BASE}/products/${id}`, { cache: "no-store" });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`No se pudo cargar el producto ${id} (status ${res.status})`);
  }

  return res.json();
}
