import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
  input,
  signal,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';
import { PricePipe } from '../../../../core/pipes/price/price.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { SwiperContainer } from 'swiper/element';
import { Swiper } from 'swiper/types';
import { CommonModule } from '@angular/common';
import { ProductDTO } from '../../dtos/product.dto';
import { ProductDetailDTO, Store } from '../../dtos/products-detail.dto';
import { SvgIconComponent } from 'angular-svg-icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonStepperComponent } from '../../../../shared/components/button-stepper/button-stepper.component';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { ProductStore } from '../../stores/product.store';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductSkeletonComponent } from '../../components/product-skeleton/product-skeleton.component';
import { CartStore } from '../../../cart/stores/cart.store';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    PricePipe,
    ButtonComponent,
    ImageComponent,
    CommonModule,
    SvgIconComponent,
    MatButtonModule,
    ButtonStepperComponent,
    ProductItemComponent,
    SharedModule,
    ProductSkeletonComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ProductComponent implements OnChanges, AfterViewInit {
  productStore = inject(ProductStore);

  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;

  public productId = input.required<number, string>({
    transform: (value: string) => parseInt(value),
  });

  imageIndex = signal<number>(0);

  loading = signal<LoadingStatus>(LoadingStatus.None);
  LoadingStatus = LoadingStatus;
  productDetail = computed<ProductDetailDTO | undefined>(() => {
    return this.productStore
      .productDetails()
      .find((productDetail) => productDetail.product.id === this.productId());
  });

  product = computed<ProductDTO | null>(() => {
    return this.productDetail()?.product ?? null;
  });

  store = computed<Store | null>(() => {
    return this.productDetail()?.store ?? null;
  });

  ngAfterViewInit() {
    this.swiper.nativeElement.swiper.on(
      'slideNextTransitionEnd',
      (swiper: Swiper) => {
        this.imageIndex.set(swiper.activeIndex);
      }
    );
    this.swiper.nativeElement.swiper.on(
      'slidePrevTransitionEnd',
      (swiper: Swiper) => {
        this.imageIndex.set(swiper.activeIndex);
      }
    );
  }

  slideToImage(imageIndex: number) {
    this.swiper.nativeElement.swiper.slideTo(imageIndex);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId']) {
      this.getProduct();
    }
  }

  async getProduct() {
    this.loading.set(LoadingStatus.Loading);
    await this.productStore.getProduct(this.productId());

    this.loading.set(LoadingStatus.Sucess);
  }

  toggleFavorite(): void {
    if (!this.product()) return;

    this.productStore.toggleFavoriteProduct(
      this.product()!,
      !this.product()!.is_favorite
    );
  }

  //** Cart */
  cartStore = inject(CartStore);
  quantity = signal<number>(1);

  addUnit(value: number) {
    this.quantity.update((q) => q + value);
  }

  addToCart() {
    if (!this.product()) return;

    this.cartStore.addUnit(this.product()!, this.quantity(), false);
  }
}
