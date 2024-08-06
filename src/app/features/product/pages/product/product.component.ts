import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';
import { ProductService } from '../../services/product.service';
import { UtilService } from '../../../../shared/services/util/util.service';
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
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ProductComponent {
  private productService = inject(ProductService);
  private utilService = inject(UtilService);
  imageIndex = signal<number>(0);
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;

  public productId = input.required<number, string>({
    transform: (value: string) => parseInt(value),
  });

  loading = signal<LoadingStatus>(LoadingStatus.None);
  productDetail = signal<ProductDetailDTO | null>(null);

  product = computed<ProductDTO | null>(() => {
    return this.productDetail()?.product ?? null;
  });

  store = computed<Store | null>(() => {
    return this.productDetail()?.store ?? null;
  });

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

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.loading.set(LoadingStatus.Loading);
    this.productService.getProduct(this.productId()).subscribe({
      next: (response) => {
        this.productDetail.set(response);
        this.loading.set(LoadingStatus.Sucess);
      },
      error: (error) => {
        this.utilService.openSnackBar(
          'An error occurred while loading the product.'
        );
        this.loading.set(LoadingStatus.Error);
      },
    });
  }

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
}
