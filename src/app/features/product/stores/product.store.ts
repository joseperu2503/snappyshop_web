import { Injectable, inject, signal } from '@angular/core';
import { ProductDTO } from '../dtos/product.dto';
import { LoadingStatus } from '../../../core/enums/loading-status.enum';
import { ProductService } from '../services/product.service';
import { UtilService } from '../../../shared/services/util/util.service';
import { ProductDetailDTO } from '../dtos/products-detail.dto';
import { AuthService } from '../../auth/services/auth/auth.service';
import { WishlistStore } from '../../wishlist/stores/wishlist.store';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  private productService = inject(ProductService);
  private utilService = inject(UtilService);
  private wishlistStore = inject(WishlistStore);

  authService = inject(AuthService);

  products = signal<ProductDTO[]>([]);
  productDetails = signal<ProductDetailDTO[]>([]);

  page = signal<number>(1);
  totalPages = signal<number>(1);
  loadingProducts = signal<LoadingStatus>(LoadingStatus.None);
  loadingProduct = signal<LoadingStatus>(LoadingStatus.None);

  getProducts() {
    if (this.page() > this.totalPages()) return;
    if (this.loadingProducts() == LoadingStatus.Loading) return;

    this.loadingProducts.set(LoadingStatus.Loading);
    this.productService
      .getProducts({
        page: this.page(),
      })
      .subscribe({
        next: (response) => {
          this.page.update((value) => value + 1);
          this.totalPages.set(response.info.last_page);
          this.products.update((value) => [...value, ...response.results]);
          this.loadingProducts.set(LoadingStatus.Sucess);
          this.handleScroll();
        },
        error: () => {
          this.utilService.openSnackBar(
            'An error occurred while loading the products.'
          );
          this.loadingProducts.set(LoadingStatus.Error);
        },
      });
  }

  handleScroll() {
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    const distanceFromBottom = 300;
    const triggerPosition = pageHeight - windowHeight - distanceFromBottom;
    if (scrollPosition >= triggerPosition) {
      this.getProducts();
    }
  }

  toggleFavoriteProduct(product: ProductDTO, isFavorite: boolean) {
    if (!this.authService.verifyAuth()) {
      this.authService.openLoginDialog();
      return;
    }

    this.products.update((value) => {
      return value.map((p) => {
        if (p.id === product.id) {
          p.is_favorite = isFavorite;
        }
        return p;
      });
    });

    this.productDetails.update((value) => {
      return value.map((p) => {
        if (p.product.id === product.id) {
          p.product.is_favorite = isFavorite;
        }

        p.store_related_products = [...p.store_related_products].map((p) => {
          if (p.id === product.id) {
            p.is_favorite = isFavorite;
          }
          return p;
        });

        return p;
      });
    });

    this.wishlistStore.toggleFavoriteProduct(product, isFavorite);

    this.productService
      .toggleFavoriteProduct(product.id, isFavorite)
      .subscribe({
        error: () => {
          this.utilService.openSnackBar(
            'An error occurred while setting up the product.'
          );
          this.loadingProducts.set(LoadingStatus.Error);
        },
      });
  }

  async getProduct(productId: number) {
    try {
      this.loadingProduct.set(LoadingStatus.Loading);

      const productIndex = this.productDetails().findIndex(
        (productDetail) => productDetail.product.id === productId
      );

      if (productIndex >= 0) {
        this.loadingProduct.set(LoadingStatus.Sucess);
        return;
      }

      const response = await firstValueFrom(
        this.productService.getProduct(productId)
      );
      this.productDetails.update((value) => {
        return [...value, response];
      });
      this.loadingProduct.set(LoadingStatus.Sucess);
    } catch (_) {
      this.utilService.openSnackBar(
        'An error occurred while loading the product.'
      );
      this.loadingProduct.set(LoadingStatus.Error);
    }
  }
}
