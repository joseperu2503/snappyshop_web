import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PricePipe } from '../../../../core/pipes/price/price.pipe';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductDTO } from '../../../product/dtos/product.dto';
import { ButtonStepperComponent } from '../../../../shared/components/button-stepper/button-stepper.component';
import { ProductCart } from '../../dtos/cart.dto';
import { CartStore } from '../../stores/cart.store';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [
    RouterLink,
    PricePipe,
    ImageComponent,
    SvgIconComponent,
    MatButtonModule,
    CommonModule,
    ButtonStepperComponent,
  ],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
})
export class ProductCartComponent {
  public productCart = input.required<ProductCart>();
  cartStore = inject(CartStore);

  product = computed<ProductDTO>(() => {
    return this.productCart().product_detail;
  });

  addUnitToCart(quantity: number) {
    this.cartStore.addUnit(this.product(), quantity);
  }
}
