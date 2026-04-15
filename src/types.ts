export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  engine: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  model?: string;
  year?: string;
  reference: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewsCount: number;
  compatibility: string[];
  specs: Record<string, string>;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}
