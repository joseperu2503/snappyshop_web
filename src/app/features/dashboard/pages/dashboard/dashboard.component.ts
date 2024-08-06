import { Component, inject } from '@angular/core';
import { ProductItemComponent } from '../../../product/components/product-item/product-item.component';
import { ProductStore } from '../../../product/stores/product.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  productStore = inject(ProductStore);

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
