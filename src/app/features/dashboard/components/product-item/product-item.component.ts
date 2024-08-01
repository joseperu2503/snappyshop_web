import { Component, input } from '@angular/core';
import { Product } from '../../../product/dtos/products-response.dto';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  public product = input.required<Product>();
}
