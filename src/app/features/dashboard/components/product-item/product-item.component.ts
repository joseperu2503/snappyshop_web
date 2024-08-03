import { Component, computed, input } from '@angular/core';
import { Product } from '../../../product/dtos/products-response.dto';
import { RouterLink } from '@angular/router';
import { PricePipe } from '../../../../core/pipes/price/price.pipe';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink, PricePipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  public product = input.required<Product>();

  basePrice = computed<number | null>(() => {
    if (!this.product()) return null;
    if (!this.product()!.discount) {
      return null;
    }
    return this.product()!.price;
  });

  salePrice = computed<number | null>(() => {
    if (!this.product()) return null;
    if (!this.product()!.discount) {
      return this.product()!.price;
    }
    return this.product()!.price * (1 - this.product()!.discount / 100);
  });
}
