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
  getProductsCount() {
    return this._httpClient
      .get<ApiResponse<number>>('https://localhost:7147/api/Product/GetCount')
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }
  getTotalProductsForSpecificCategory(categoryId: number) {
    return this._httpClient
      .get<ApiResponse<number>>(
        `https://localhost:7147/api/Product/GetByCategoryCount?categoryId=${categoryId}`
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  getPaginatedProducts(pageNumber: number, pageSize: number) {
    return this._httpClient
      .get<ApiResponse<Product[]>>(
        `https://localhost:7147/api/Product/GetPaginated?pageSize=${pageSize}&pageNumber=${pageNumber}`
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

  getPaginatedProductsByCategory(
    categoryId: number,
    pageNumber: number,
    pageSize: number
  ) {
    return this._httpClient
      .get<ApiResponse<Product[]>>(
        `https://localhost:7147/api/Product/GetByCategoryId?categoryId=${categoryId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res.data;
        })
      );
  }
}
