import { Component, inject } from '@angular/core';
import { ProductService } from '../../../product/services/product.service';
import { Product } from '../../../product/dtos/products-response.dto';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';
import { UtilService } from '../../../../shared/services/util/util.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  private productService = inject(ProductService);
  private utilService = inject(UtilService);

  products: Product[] = [];
  page: number = 1;
  totalPages: number = 1;
  loading: LoadingStatus = LoadingStatus.None;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    if (this.page > this.totalPages) return;
    if (this.loading == LoadingStatus.Loading) return;

    this.loading = LoadingStatus.Loading;
    this.productService
      .getProducts({
        page: this.page,
      })
      .subscribe({
        next: (response) => {
          this.page = this.page + 1;
          this.totalPages = response.info.last_page;
          this.products.push(...response.results);
          this.loading = LoadingStatus.Sucess;
        },
        error: (error) => {
          this.utilService.openSnackBar(
            'An error occurred while loading the products.'
          );
          this.loading = LoadingStatus.Error;
        },
      });
  }

  ngAfterViewInit(): void {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', () => this.handleScroll());
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
