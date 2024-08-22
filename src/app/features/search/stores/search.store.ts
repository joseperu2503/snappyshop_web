import { Injectable, inject, signal } from '@angular/core';
import { LoadingStatus } from '../../../core/enums/loading-status.enum';
import { UtilService } from '../../../shared/services/util/util.service';
import { ProductService } from '../../product/services/product.service';
import { ProductDTO } from '../../product/dtos/product.dto';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  private productService = inject(ProductService);
  private utilService = inject(UtilService);
  private router = inject(Router);

  products = signal<ProductDTO[]>([]);
  preResults = signal<ProductDTO[]>([]);
  private totalPagesPre = signal<ProductDTO[]>([]);

  private page = signal<number>(1);
  private totalPages = signal<number>(1);
  loadingProducts = signal<LoadingStatus>(LoadingStatus.None);
  searchingProducts = signal<LoadingStatus>(LoadingStatus.None);

  searchInput = signal<string>('');
  filter = signal<Filter>({
    search: '',
  });

  changeFilter(filter: Filter) {
    this.filter.set(filter);
    this.searchInput.set(this.filter().search ?? '');
    this.products.set([]);
    this.page.set(1);
    this.totalPages.set(1);
    this.getProducts();
  }

  viewMoreResults() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchInput() },
      queryParamsHandling: 'merge',
    });
  }

  searchProducts(search: string) {
    this.searchInput.set(search);

    this.preResults.set([]);

    if (search == '') return;

    this.searchingProducts.set(LoadingStatus.Loading);
    this.productService
      .getProducts({
        page: 1,
        search: this.searchInput(),
      })
      .subscribe({
        next: (response) => {
          if (search === this.searchInput()) {
            this.preResults.set(response.results);
            this.searchingProducts.set(LoadingStatus.Sucess);
          }
        },
        error: () => {
          this.utilService.openSnackBar(
            'An error occurred while loading the products.'
          );
          this.searchingProducts.set(LoadingStatus.Error);
        },
      });
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
          console.log(filter, this.filter());
          if (_.isEqual(filter, this.filter())) {
            this.page.update((value) => value + 1);
            this.totalPages.set(response.info.last_page);
            this.products.update((value) => [...value, ...response.results]);
            this.loadingProducts.set(LoadingStatus.Sucess);
            this.handleScroll();
          }
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
}

interface Filter {
  search?: string | null;
}
