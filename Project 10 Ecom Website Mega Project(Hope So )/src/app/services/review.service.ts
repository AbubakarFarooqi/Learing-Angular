import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../models/apiResponse.model';
import { ReviewModel } from '../../models/review.model';
import { map } from 'rxjs';
import { ApiUrls } from './urls';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  _httpClient = inject(HttpClient);
  reviewsCount?: number;
  pageSize = 3;
  totalPages?: number;
  currentPage = 0;
  constructor() {
    this._httpClient
      .get<ApiResponse<number>>(ApiUrls.reviews.getCount)
      .subscribe({
        next: (res) => {
          this.reviewsCount = res.data;
          this.totalPages = Math.ceil(this.reviewsCount / this.pageSize);
        },
      });
  }

  isPageAvailable() {
    if (this.currentPage + 1 > this.totalPages!) {
      return false;
    }
    return true;
  }
  getPaginatedReviews() {
    this.currentPage = this.currentPage + 1;
    return this._httpClient
      .get<ApiResponse<ReviewModel[]>>(
        `${ApiUrls.reviews.getPaginatedReviews}?pageSize=${this.pageSize}&pageNumber=${this.currentPage}`
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res.data;
        })
      );
  }
}
