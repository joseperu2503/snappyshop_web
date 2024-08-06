export interface ProductDTO {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly images: string[];
  readonly category: Category;
  readonly colors: string[];
  readonly store: Store;
  readonly discount: number;
  readonly created_at: Date;
  readonly is_favorite: boolean;
}

interface Category {
  readonly id: number;
  readonly name: string;
}

interface Store {
  readonly id: number;
  readonly name: string;
}