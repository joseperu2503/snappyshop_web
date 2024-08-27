import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PricePipe } from '../../../../core/pipes/price/price.pipe';
import { ProductDTO } from '../../dtos/product.dto';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductStore } from '../../stores/product.store';

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
  productStore = inject(ProductStore);

  toggleFavorite(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.productStore.toggleFavoriteProduct(
      this.product(),
      !this.product().is_favorite
    );
  }
}
