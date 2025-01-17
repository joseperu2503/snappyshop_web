import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ProductItemComponent } from '../../../product/components/product-item/product-item.component';
import { ProductStore } from '../../../product/stores/product.store';
import { ProductSkeletonComponent } from '../../../product/components/product-skeleton/product-skeleton.component';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';
import { SearchInputMaskComponent } from '../../components/search-input-mask/search-input-mask.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ProductItemComponent,
    ProductSkeletonComponent,
    SearchInputMaskComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  productStore = inject(ProductStore);
  LoadingStatus = LoadingStatus;

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
