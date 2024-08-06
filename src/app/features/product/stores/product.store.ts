import { Injectable, inject, signal } from '@angular/core';
import { ProductDTO } from '../dtos/product.dto';
import { LoadingStatus } from '../../../core/enums/loading-status.enum';
import { ProductService } from '../services/product.service';
import { UtilService } from '../../../shared/services/util/util.service';

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  constructor() {}

  private productService = inject(ProductService);
  private utilService = inject(UtilService);

  products = signal<ProductDTO[]>([]);
  page = signal<number>(1);
  totalPages = signal<number>(1);
  loading = signal<LoadingStatus>(LoadingStatus.None);

  getProducts() {
    if (this.page > this.totalPages) return;
    if (this.loading() == LoadingStatus.Loading) return;

    this.loading.set(LoadingStatus.Loading);
    this.productService
      .getProducts({
        page: this.page(),
      })
      .subscribe({
        next: (response) => {
          this.page.update((value) => value + 1);
          this.totalPages.set(response.info.last_page);
          this.products.update((value) => [...value, ...response.results]);
          this.loading.set(LoadingStatus.Sucess);
          this.handleScroll();
        },
        error: (error) => {
          this.utilService.openSnackBar(
            'An error occurred while loading the products.'
          );
          this.loading.set(LoadingStatus.Error);
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

    this.productService.toggleFavoriteProduct(productId, isFavorite).subscribe({
      next: (response) => {},
      error: (error) => {
        this.utilService.openSnackBar(
          'An error occurred while setting up the product.'
        );
        this.loading.set(LoadingStatus.Error);
      },
    });
  }
}
