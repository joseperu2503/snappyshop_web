export interface ProductsResponseDTO {
  readonly results: Product[];
  readonly info: Info;
}

export interface Info {
  readonly per_page: number;
  readonly current_page: number;
  readonly last_page: number;
  readonly total: number;
}

export interface Product {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly images: string[];
  readonly brand: Brand;
  readonly category: Category;
  readonly colors: string[];
  readonly user: User;
  readonly discount: number;
  readonly created_at: Date;
  readonly is_favorite: boolean;
}

export interface Brand {
  readonly id: number;
  readonly name: string;
}

export interface Category {
  readonly id: number;
  readonly name: string;
}

export interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
}
