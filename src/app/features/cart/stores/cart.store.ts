import { Injectable, computed, inject, signal } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartDTO, ProductCart } from '../dtos/cart.dto';
import { ProductDTO } from '../../product/dtos/product.dto';
import { LoadingStatus } from '../../../core/enums/loading-status.enum';
import { Subscription } from 'rxjs';
import { TokenService } from '../../../core/services/token/token.service';
import { UserService } from '../../user/services/user.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartStore {
  private cartService = inject(CartService);
  cart = signal<CartDTO | null>(null);
  loadingStatus = signal<LoadingStatus>(LoadingStatus.None);
  private tokenService = inject(TokenService);
  userService = inject(UserService);
  authService = inject(AuthService);

  productCarts = computed<ProductCart[]>(() => {
    return this.cart()?.products ?? [];
  });

  getCart() {
    if (!this.tokenService.validateToken().isValid) return;

    this.loadingStatus.set(LoadingStatus.Loading);

    this.cartService.getCart().subscribe({
      next: (response) => {
        this.loadingStatus.set(LoadingStatus.Sucess);
        this.cart.set(response);
      },
      error: () => {
        this.loadingStatus.set(LoadingStatus.Error);
      },
    });
  }

  private debounceTimer: NodeJS.Timeout | null = null;
  subscription: Subscription | null = null;

  async addUnit(
    product: ProductDTO,
    quantity: number,
    withDebouncer: boolean = true
  ) {
    if (!this.userService.user()) {
      this.authService.openLoginDialog();
      return;
    }
    if (!this.cart()) return;

    const productIndex = this.productCarts().findIndex(
      (pc) => pc.product_detail.id == product.id
    );

    if (productIndex >= 0) {
      this.cart.update((value) => {
        return {
          products: value!.products
            .map((pc) => {
              if (pc.product_detail.id == product.id) {
                return {
                  ...pc,
                  quantity: pc.quantity + quantity,
                };
              }
              return pc;
            })
            .filter((pc) => pc.quantity != 0),
          total_amount: value!.total_amount,
        };
      });
    } else {
      this.cart.update((value) => {
        return {
          products: [
            ...value!.products,
            {
              id: null,
              product_detail: product,
              quantity: quantity,
            },
          ],
          total_amount: value!.total_amount,
        };
      });
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.subscription?.unsubscribe();

    this.debounceTimer = setTimeout(
      () => {
        this.loadingStatus.set(LoadingStatus.Loading);

        this.subscription = this.cartService
          .updateCart(this.cart()!)
          .subscribe({
            next: (response) => {
              this.loadingStatus.set(LoadingStatus.Sucess);
              this.cart.set(response.data);
            },
            error: () => {
              this.loadingStatus.set(LoadingStatus.Error);
            },
          });
      },
      withDebouncer ? 1000 : 0
    );
  }
}