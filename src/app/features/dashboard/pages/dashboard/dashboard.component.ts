import { Component, inject } from '@angular/core';
import { ProductService } from '../../../product/services/product.service';
import { Product } from '../../../product/dtos/products-response.dto';
import { ProductItemComponent } from '../../components/product-item/product-item.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  private productService = inject(ProductService);

  products: Product[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.results;
      },
    });
  }
}
