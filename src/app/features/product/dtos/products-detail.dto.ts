import { ProductDTO } from './product.dto';

export interface ProductDetailDTO {
  readonly product: ProductDTO;
  readonly store_related_products: StoreRelatedProduct[];
  readonly store: Store;
}

export interface Store {
  readonly id: number;
  readonly name: string;
  readonly description: string | null;
  readonly website: string | null;
  readonly email: string | null;
  readonly phone: string | null;
  readonly facebook: string | null;
  readonly instagram: string | null;
  readonly logotype: string | null;
  readonly isotype: string | null;
  readonly backdrop: string | null;
}

export interface StoreRelatedProduct {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly images: string[];
  readonly store_id: number;
  readonly category_id: number;
  readonly colors: any[];
  readonly is_active: boolean;
  readonly discount: number | null;
  readonly created_at: Date;
  readonly updated_at: Date;
}
