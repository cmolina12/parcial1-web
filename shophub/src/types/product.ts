/**
 * Forma "resumida" de un producto, tal como la devuelve el endpoint de listado:
 * GET /products?limit=8&select=id,title,price,category,thumbnail,stock
 */
export interface ProductSummary {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
}

/**
 * Forma completa de un producto, tal como la devuelve el endpoint de detalle:
 * GET /products/{id}
 * Solo se tipan los campos que la app realmente usa; DummyJSON trae más.
 */
export interface ProductDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand?: string;
  images: string[];
  thumbnail: string;
}

/** Respuesta del endpoint de listado de DummyJSON. */
export interface ProductListResponse {
  products: ProductSummary[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Producto dentro del carrito: la info mínima necesaria para mostrarlo
 * en el Header/checkout, más la cantidad seleccionada.
 */
export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}
