import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ProductItemComponent } from '../../../product/components/product-item/product-item.component';
import { WishlistStore } from '../../stores/wishlist.store';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export default class WishlistComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  wishlistStore = inject(WishlistStore);

  ngOnInit() {
    this.wishlistStore.getProducts();
  }

  ngAfterViewInit(): void {
    window.addEventListener('scroll', () => this.wishlistStore.handleScroll());
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', () =>
      this.wishlistStore.handleScroll()
    );
  }
}
