import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { CartDTO, CreateCartResponse } from '../dtos/cart.dto';
import { CreateCartDTO } from '../dtos/create-cart.dto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private api = inject(ApiService);

  getCart() {
    return this.api.get<CartDTO>('cart/my-cart');
  }

  updateCart(cart: CartDTO) {
    const body: CreateCartDTO = {
      products: cart.products.map((pc) => ({
        id: pc.product_detail.id,
        quantity: pc.quantity,
      })),
    };

    return this.api.post<CreateCartResponse>('cart', body);
  }
}
