import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../models/apiResponse.model';
import { Product } from '../../models/product.model';
import { map, tap } from 'rxjs';
import { type TopFourProducts } from '../../models/topFourProduct.model';

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

  setTotalPagesForSpecificCategory(categoryId: number) {
    return this._httpClient
      .get<ApiResponse<number>>(
        `https://localhost:7147/api/Product/GetByCategoryCount?categoryId=${categoryId}`
      )
      .pipe(
        tap({
          next: (res) => {
            this.productsCount = res.data;
            this.totalPages = Math.ceil(this.productsCount / this.pageSize);
            console.log(this.totalPages + 'Azan');
          },
        })
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
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
          console.log(res);
          return res.data;
        })
      );
  }

  getFourProductOfEachCategory() {
    return this._httpClient
      .get<ApiResponse<{ [key: string]: Product[] }>>(
        `https://localhost:7147/api/Product/GetFourOfAllCategories`
      )
      .pipe(
        map((res) => {
          const manipulatedData: TopFourProducts[] = [];
          for (let key in res.data) {
            const categoryId = key.split(',')[0];
            const categoryName = key.split(',')[1];
            manipulatedData.push({
              categoryId: categoryId,
              categoryName: categoryName,
              value: res.data[key],
            });
          }
          console.log(manipulatedData);
          return manipulatedData;
        })
      );
  }

  getPaginatedProductsByCategory(categoryId: number) {
    this.currentPage = this.currentPage + 1;
    return this._httpClient
      .get<ApiResponse<Product[]>>(
        `https://localhost:7147/api/Product/GetByCategoryId?categoryId=${categoryId}&pageSize=${this.pageSize}&pageNumber=${this.currentPage}`
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res.data;
        })
      );
  }
}
