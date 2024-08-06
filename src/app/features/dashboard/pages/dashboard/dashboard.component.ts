import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../../product/services/product.service';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';
import { UtilService } from '../../../../shared/services/util/util.service';
import { ProductDTO } from '../../../product/dtos/product.dto';

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

  products = signal<ProductDTO[]>([]);
  page = signal<number>(1);
  totalPages = signal<number>(1);
  loading = signal<LoadingStatus>(LoadingStatus.None);

  ngOnInit() {
    this.getProducts();
  }

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
