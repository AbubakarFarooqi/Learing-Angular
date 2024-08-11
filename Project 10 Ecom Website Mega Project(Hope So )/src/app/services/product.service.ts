import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../models/apiResponse.model';
import { Product } from '../../models/product.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _httpClient = inject(HttpClient);
  productsCount?: number;
  pageSize = 4;
  totalPages?: number;
  currentPage = 0;
  constructor() {
    this._httpClient
      .get<ApiResponse<number>>('https://localhost:7147/api/Product/GetCount')
      .subscribe({
        next: (res) => {
          this.productsCount = res.data;
          this.totalPages = Math.ceil(this.productsCount / this.pageSize);
        },
      });
  }

  isPageAvailable() {
    if (this.currentPage + 1 > this.totalPages!) {
      return false;
    }
    return true;
  }
  //   isProductsAvailable
  getPaginatedProducts() {
    this.currentPage = this.currentPage + 1;
    return this._httpClient
      .get<ApiResponse<Product[]>>(
        `https://localhost:7147/api/Product/GetPaginated?pageSize=${this.pageSize}&pageNumber=${this.currentPage}`
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }
}
