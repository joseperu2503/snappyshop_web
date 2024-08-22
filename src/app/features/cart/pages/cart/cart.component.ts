import { Component, OnInit, inject } from '@angular/core';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PricePipe } from '../../../../core/pipes/price/price.pipe';
import { CartStore } from '../../stores/cart.store';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductCartComponent, ButtonComponent, PricePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export default class CartComponent implements OnInit {
  cartStore = inject(CartStore);
  LoadingStatus = LoadingStatus;

  ngOnInit() {
    this.cartStore.getCart();
  }
}
