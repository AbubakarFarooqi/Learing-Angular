import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../models/apiResponse.model';
import { Product } from '../../models/product.model';
import { map, switchAll, tap } from 'rxjs';
import { type TopFourProducts } from '../../models/topFourProduct.model';
import { ApiUrls } from './urls';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _httpClient = inject(HttpClient);
  getProductsCount() {
    return this._httpClient
      .get<ApiResponse<number>>(ApiUrls.products.getProductsCount)
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }
  getTotalProductsForSpecificCategory(categoryId: number) {
    return this._httpClient
      .get<ApiResponse<number>>(
        `${ApiUrls.products.getTotalProductsForSpecificCategory}?categoryId=${categoryId}`
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
        `${ApiUrls.products.getPaginatedProducts}?pageSize=${pageSize}&pageNumber=${pageNumber}`
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
        ApiUrls.products.getFourProductOfEachCategory
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

  getPaginatedProductNames(
    searchString: string,
    pageNumber: number,
    pageSize: number
  ) {
    return this._httpClient
      .get<ApiResponse<string[]>>(
        `${ApiUrls.products.getPaginatedProductNames}?searchString=${searchString}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res.data;
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
        `${ApiUrls.products.getPaginatedProductsByCategory}?categoryId=${categoryId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res.data;
        })
      );
  }

  getProductById(productId: number) {
    return this._httpClient
      .get<ApiResponse<Product>>(
        `${ApiUrls.products.getProductById}?id=${productId}`
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res.data;
        })
      );
  }

  getPaginatedProductsThatMatchName(
    searchString: string,
    pageNumber: number,
    pageSize: number
  ) {
    return this._httpClient
      .get<ApiResponse<Product[]>>(
        `${ApiUrls.products.getPaginatedProductsThatMatchName}?searchString=${searchString}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res.data;
        })
      );
  }
}
