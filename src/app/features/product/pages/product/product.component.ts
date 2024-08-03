import {
  Component,
  Input,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';
import { ProductService } from '../../services/product.service';
import { UtilService } from '../../../../shared/services/util/util.service';
import { Product } from '../../dtos/products-response.dto';
import { PricePipe } from '../../../../core/pipes/price/price.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [PricePipe, ButtonComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export default class ProductComponent {
  private productService = inject(ProductService);
  private utilService = inject(UtilService);

  public productId = input.required<number, string>({
    transform: (value: string) => parseInt(value),
  });

  loading = signal<LoadingStatus>(LoadingStatus.None);
  product = signal<Product | null>(null);

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
        this.product.set(response);
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
}
