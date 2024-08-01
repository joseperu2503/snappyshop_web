import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { ProductsResponseDTO } from '../dtos/products-response.dto';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = inject(ApiService);

  getProducts(
    query: {
      page: number;
      categoryId?: number;
      brandId?: number;
      minPrice?: number;
      maxPrice?: number;
      search?: string;
    } = {
      page: 1,
    }
  ) {
    let httpParams = new HttpParams().set('page', query.page.toString());

    if (query.categoryId !== undefined) {
      httpParams = httpParams.set('categoryId', query.categoryId.toString());
    }

    if (query.brandId !== undefined) {
      httpParams = httpParams.set('brandId', query.brandId.toString());
    }

    if (query.minPrice !== undefined) {
      httpParams = httpParams.set('minPrice', query.minPrice.toString());
    }

    if (query.maxPrice !== undefined) {
      httpParams = httpParams.set('maxPrice', query.maxPrice.toString());
    }

    if (query.search !== undefined) {
      httpParams = httpParams.set('search', query.search);
    }

    return this.api.get<ProductsResponseDTO>(`products`, httpParams);
  }
}
