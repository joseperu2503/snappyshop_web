import { Component, inject } from '@angular/core';
import { ProductItemComponent } from '../../../product/components/product-item/product-item.component';
import { ProductStore } from '../../../product/stores/product.store';
import { ProductSkeletonComponent } from '../../../product/components/product-skeleton/product-skeleton.component';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductItemComponent, ProductSkeletonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  productStore = inject(ProductStore);
  LoadingStatus = LoadingStatus;
  ngOnInit() {
    this.productStore.getProducts();
  }

  ngAfterViewInit(): void {
    window.addEventListener('scroll', () => this.productStore.handleScroll());
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', () =>
      this.productStore.handleScroll()
    );
  }
}
