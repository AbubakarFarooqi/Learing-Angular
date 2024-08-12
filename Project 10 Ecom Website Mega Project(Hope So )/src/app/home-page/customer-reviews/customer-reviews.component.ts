import { Component, DestroyRef, inject } from '@angular/core';
import { ReviewComponent } from '../../shared/review/review.component';
import { ReviewService } from '../../services/review.service';
import { ReviewModel } from '../../../models/review.model';

@Component({
  selector: 'app-customer-reviews',
  standalone: true,
  imports: [ReviewComponent],
  templateUrl: './customer-reviews.component.html',
  styleUrl: './customer-reviews.component.css',
})
export class CustomerReviewsComponent {
  private _reviewService = inject(ReviewService);
  private _destroyRef = inject(DestroyRef);
  reviews: ReviewModel[] = [];
  constructor() {
    const subscription = this._reviewService.getPaginatedReviews().subscribe({
      next: (data) => {
        console.log(data);
        this.reviews = this.reviews?.concat(data);
      },
    });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get isPageAvailable() {
    return this._reviewService.isPageAvailable();
  }
  onViewMore() {
    const subscription = this._reviewService.getPaginatedReviews().subscribe({
      next: (data) => {
        console.log(data);
        this.reviews = this.reviews?.concat(data);
      },
    });
    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
