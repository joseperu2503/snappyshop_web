import { Injectable, inject, signal } from '@angular/core';
import { LoadingStatus } from '../../../core/enums/loading-status.enum';
import { UtilService } from '../../../shared/services/util/util.service';
import { ProductService } from '../../product/services/product.service';
import { ProductDTO } from '../../product/dtos/product.dto';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  private productService = inject(ProductService);
  private utilService = inject(UtilService);

  products = signal<ProductDTO[]>([]);

  private page = signal<number>(1);
  private totalPages = signal<number>(1);
  loadingProducts = signal<LoadingStatus>(LoadingStatus.None);

  filter = signal<Filter>({
    search: '',
  });

  changeSearch(search: string) {
    this.filter.update((value) => {
      value.search = search;
      return value;
    });

    if (search == '') {
      this.products.set([]);
      return;
    }

    this.changeFilter();
  }

  changeFilter() {
    this.products.set([]);
    this.page.set(1);
    this.totalPages.set(1);
    this.getProducts();
  }

  getProducts() {
    if (this.page > this.totalPages) return;
    const filter = { ...this.filter() };

    this.loadingProducts.set(LoadingStatus.Loading);
    this.productService
      .getProducts({
        page: this.page(),
        search: this.filter().search,
      })
      .subscribe({
        next: (response) => {
          if (_.isEqual(filter, this.filter())) {
            this.page.update((value) => value + 1);
            this.totalPages.set(response.info.last_page);
            this.products.update((value) => [...value, ...response.results]);
            this.loadingProducts.set(LoadingStatus.Sucess);
          }
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

  toggleFavoriteProduct(product: ProductDTO, isFavorite: boolean) {
    this.products.update((value) => {
      value = value.filter((p) => p.id != product.id);
      if (isFavorite) {
        return [...value, product];
      }

      return value;
    });
  }
}

interface Filter {
  search: string;
}
