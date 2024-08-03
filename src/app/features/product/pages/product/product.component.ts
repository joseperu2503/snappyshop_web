import { Component, Input, inject, input, signal } from '@angular/core';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';
import { ProductService } from '../../services/product.service';
import { UtilService } from '../../../../shared/services/util/util.service';
import { Product } from '../../dtos/products-response.dto';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
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
