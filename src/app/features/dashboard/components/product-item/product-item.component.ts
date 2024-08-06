import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PricePipe } from '../../../../core/pipes/price/price.pipe';
import { ProductDTO } from '../../../product/dtos/product.dto';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    RouterLink,
    PricePipe,
    ImageComponent,
    SvgIconComponent,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  public product = input.required<ProductDTO>();

  basePrice = computed<number | null>(() => {
    if (!this.product().discount) {
      return null;
    }
    return this.product()!.price;
  });

  icon = computed<string>(() => {
    if (this.product().is_favorite) {
      return 'assets/icons/heart_solid.svg';
    }
    return 'assets/icons/heart_outlined.svg';
  });

  salePrice = computed<number | null>(() => {
    if (!this.product().discount) {
      return this.product().price;
    }
    return this.product()!.price * (1 - this.product()!.discount / 100);
  });

  toggleFavorite(event: MouseEvent): void {
    console.log('toggleFavorite');
    event.stopPropagation();
    event.preventDefault();
  }
}
