import { ProductDTO } from '../../product/dtos/product.dto';

export interface CreateCartResponse {
  readonly success: boolean;
  readonly message: string;
  readonly data: CartDTO;
}

export interface CartDTO {
  readonly subtotal: number;
  readonly shipping_fee: number;
  readonly total: number;
  readonly products: ProductCart[];
}

export interface ProductCart {
  readonly id: number | null;
  readonly product_detail: ProductDTO;
  readonly quantity: number;
}
