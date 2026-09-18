
export interface ProductSummary {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
}


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
export interface ProductListResponse {
  products: ProductSummary[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}
