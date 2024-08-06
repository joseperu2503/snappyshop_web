import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../../product/services/product.service';
import { ProductItemComponent } from '../../../product/components/product-item/product-item.component';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';
import { UtilService } from '../../../../shared/services/util/util.service';
import { ProductDTO } from '../../../product/dtos/product.dto';
import { ProductStore } from '../../../product/stores/product.store';

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
