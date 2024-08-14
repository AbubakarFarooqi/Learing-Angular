// import { Component, DestroyRef, inject } from '@angular/core';
// import { ReviewComponent } from '../../shared/review/review.component';
// import { ReviewService } from '../../services/review.service';
// import { ReviewModel } from '../../../models/review.model';

// @Component({
//   selector: 'app-customer-reviews',
//   standalone: true,
//   imports: [ReviewComponent],
//   templateUrl: './customer-reviews.component.html',
//   styleUrl: './customer-reviews.component.css',
// })
// export class CustomerReviewsComponent {
//   private _reviewService = inject(ReviewService);
//   private _destroyRef = inject(DestroyRef);
//   reviews: ReviewModel[] = [];
//   constructor() {
//     const subscription = this._reviewService.getPaginatedReviews().subscribe({
//       next: (data) => {
//         console.log(data);
//         this.reviews = this.reviews?.concat(data);
//       },
//     });

//     this._destroyRef.onDestroy(() => {
//       subscription.unsubscribe();
//     });
//   }

//   get isPageAvailable() {
//     return this._reviewService.isPageAvailable();
//   }
//   onViewMore() {
//     const subscription = this._reviewService.getPaginatedReviews().subscribe({
//       next: (data) => {
//         console.log(data);
//         this.reviews = this.reviews?.concat(data);
//       },
//     });
//     this._destroyRef.onDestroy(() => {
//       subscription.unsubscribe();
//     });
//   }
// }

// import { Component } from '@angular/core';
// import { ReviewComponent } from '../../shared/review/review.component';
// import { NgStyle } from '@angular/common';

// @Component({
//   selector: 'app-customer-reviews',
//   standalone: true,
//   imports: [ReviewComponent, NgStyle],
//   templateUrl: './customer-reviews.component.html',
//   styleUrls: ['./customer-reviews.component.css'],
// })
// export class CustomerReviewsComponent {
//   reviews = [
//     {
//       comment: 'sdsd',
//       rating: 5,
//       userName: 'Azan',
//       reviewID: 1,
//     },
//     {
//       comment: 'sdsd',
//       rating: 5,
//       userName: 'Azan',
//       reviewID: 2,
//     },
//     {
//       comment: 'sdsd',
//       rating: 5,
//       userName: 'Azan',
//       reviewID: 3,
//     },
//     {
//       comment: 'sdsd',
//       rating: 5,
//       userName: 'Azan',
//       reviewID: 4,
//     },
//     {
//       comment: 'sdsd',
//       rating: 5,
//       userName: 'Azan',
//       reviewID: 5,
//     },
//   ];

//   currentSlide = 0;
//   currentTranslateX = 0;
//   slideWidthPercentage = 100; // Percentage of slide width (adjust if needed)

//   prevSlide() {
//     if (this.currentSlide > 0) {
//       this.currentSlide--;
//       this.updateTranslateX();
//     }
//   }

//   nextSlide() {
//     if (this.currentSlide < this.reviews.length - 1) {
//       this.currentSlide++;
//       this.updateTranslateX();
//     }
//   }

//   updateTranslateX() {
//     this.currentTranslateX = -this.currentSlide * this.slideWidthPercentage;
//   }

//   trackByReviewID(index: number, review: any) {
//     return review.reviewID;
//   }
// }

import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ReviewComponent } from '../../shared/review/review.component';
import { NgFor, NgStyle } from '@angular/common';
import { ReviewService } from '../../services/review.service';
import { ReviewModel } from '../../../models/review.model';

@Component({
  standalone: true,
  imports: [ReviewComponent, NgStyle, NgFor],
  selector: 'app-customer-reviews',
  templateUrl: './customer-reviews.component.html',
  styleUrls: ['./customer-reviews.component.css'],
})
export class CustomerReviewsComponent implements OnInit {
  reviews: ReviewModel[] = [
    // {
    //   comment: 'sdsd',
    //   rating: 5,
    //   userName: 'Azan',
    //   reviewID: 1,
    // },
    // {
    //   comment: 'sdsd',
    //   rating: 5,
    //   userName: 'Azan',
    //   reviewID: 2,
    // },
    // {
    //   comment: 'sdsd',
    //   rating: 5,
    //   userName: 'Azan',
    //   reviewID: 3,
    // },
    // {
    //   comment: 'sdsd',
    //   rating: 5,
    //   userName: 'Azan',
    //   reviewID: 4,
    // },
    // {
    //   comment: 'sdsd',
    //   rating: 5,
    //   userName: 'Azan',
    //   reviewID: 5,
    // },
  ];

  groupedReviews: any[][] = [];
  currentSlide = 0;
  currentTranslateX = 0;
  slideWidthPercentage = 100; // Percentage of slide width (one full slide)

  ngOnInit() {
    this.groupReviews();
  }

  private _reviewService = inject(ReviewService);
  private _destroyRef = inject(DestroyRef);
  //reviews: ReviewModel[] = [];
  constructor() {
    const subscription = this._reviewService.getPaginatedReviews().subscribe({
      next: (data) => {
        console.log(data);
        this.reviews = this.reviews?.concat(data);
        this.groupReviews();
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
    if (this.nextSlide()) {
      return;
    }
    const subscription = this._reviewService.getPaginatedReviews().subscribe({
      next: (data) => {
        console.log(data);
        // this.groupedReviews = this.groupedReviews.push(data);
        if (data.length != 0) {
          this.groupedReviews.push(data);
          this.nextSlide();
        }
      },
    });
    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  groupReviews() {
    for (let i = 0; i < this.reviews.length; i += 3) {
      this.groupedReviews.push(this.reviews.slice(i, i + 3));
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateTranslateX();
    }
  }

  nextSlide() {
    if (this.currentSlide < this.groupedReviews.length - 1) {
      this.currentSlide++;
      this.updateTranslateX();
      return true;
    }
    return false;
  }

  updateTranslateX() {
    this.currentTranslateX = -this.currentSlide * this.slideWidthPercentage;
  }

  trackByReviewID(index: number, review: any) {
    return review.reviewID;
  }
}
