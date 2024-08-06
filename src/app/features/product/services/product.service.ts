import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { HttpParams } from '@angular/common/http';
import { ProductDetailDTO } from '../dtos/products-detail.dto';
import { ProductsResponseDTO } from '../dtos/products-response.dto';
import { ToggleFavoriteResponse } from '../dtos/toggle-favorite-response.dto';

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

  getProduct(productId: number) {
    return this.api.get<ProductDetailDTO>(`products/${productId}`);
  }

  toggleFavoriteProduct(productId: number, isFavorite: boolean) {
    const body = {
      is_favorite: isFavorite,
      product_id: productId,
    };
    return this.api.post<ToggleFavoriteResponse>(
      `products/toggle-favorite-product`,
      body
    );
  }
}
