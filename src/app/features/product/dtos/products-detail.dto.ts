import { ProductDTO } from './product.dto';

export interface ProductDetailDTO {
  readonly product: ProductDTO;
  readonly store_related_products: ProductDTO[];
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
