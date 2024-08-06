import { ProductDTO } from './product.dto';

export interface ProductsResponseDTO {
  readonly results: ProductDTO[];
  readonly info: Info;
}

export interface Info {
  readonly per_page: number;
  readonly current_page: number;
  readonly last_page: number;
  readonly total: number;
}
