import { Injectable, inject, signal } from '@angular/core';
import { ProductDTO } from '../dtos/product.dto';
import { LoadingStatus } from '../../../core/enums/loading-status.enum';
import { ProductService } from '../services/product.service';
import { UtilService } from '../../../shared/services/util/util.service';
import { ProductDetailDTO } from '../dtos/products-detail.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  constructor() {}

  private productService = inject(ProductService);
  private utilService = inject(UtilService);

  products = signal<ProductDTO[]>([]);
  productDetails = signal<ProductDetailDTO[]>([]);

  page = signal<number>(1);
  totalPages = signal<number>(1);
  loadingProducts = signal<LoadingStatus>(LoadingStatus.None);
  loadingProduct = signal<LoadingStatus>(LoadingStatus.None);

  getProducts() {
    if (this.page > this.totalPages) return;
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
        error: (error) => {
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

  toggleFavoriteProduct(productId: number, isFavorite: boolean) {
    this.products.update((value) => {
      return value.map((value) => {
        if (value.id === productId) {
          value.is_favorite = isFavorite;
        }
        return value;
      });
    });

    this.productDetails.update((value) => {
      return value.map((value) => {
        if (value.product.id === productId) {
          value.product.is_favorite = isFavorite;
        }

        value.store_related_products = [...value.store_related_products].map(
          (value) => {
            if (value.id === productId) {
              value.is_favorite = isFavorite;
            }
            return value;
          }
        );

        return value;
      });
    });

    this.productService.toggleFavoriteProduct(productId, isFavorite).subscribe({
      next: (response) => {},
      error: (error) => {
        this.utilService.openSnackBar(
          'An error occurred while setting up the product.'
        );
        this.loadingProducts.set(LoadingStatus.Error);
      },
    });
  }

  getProduct(productId: number) {
    this.loadingProduct.set(LoadingStatus.Loading);

    const productIndex = this.productDetails().findIndex(
      (productDetail) => productDetail.product.id === productId
    );

    if (productIndex >= 0) {
      this.loadingProduct.set(LoadingStatus.Sucess);
      return;
    }

    this.productService.getProduct(productId).subscribe({
      next: (response) => {
        this.productDetails.update((value) => {
          return [...value, response];
        });
        this.loadingProduct.set(LoadingStatus.Sucess);
      },
      error: (error) => {
        this.utilService.openSnackBar(
          'An error occurred while loading the product.'
        );
        this.loadingProduct.set(LoadingStatus.Error);
      },
    });
  }
}
