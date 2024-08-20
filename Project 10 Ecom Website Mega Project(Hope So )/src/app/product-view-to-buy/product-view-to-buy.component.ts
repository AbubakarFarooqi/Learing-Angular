import { Component, inject, Input, OnInit } from '@angular/core';
import { StarRatingComponent } from '../shared/star-rating/star-rating.component';
import { CurrencyPipe } from '@angular/common';
import { CustomButtonComponent } from '../shared/custom-button/custom-button.component';
import { ProductService } from '../services/product.service';
import { ReviewComponent } from '../shared/review/review.component';
import { ReviewService } from '../services/review.service';
import { ReviewModel } from '../../models/review.model';

@Component({
  selector: 'app-product-view-to-buy',
  standalone: true,
  imports: [
    StarRatingComponent,
    CurrencyPipe,
    CustomButtonComponent,
    ReviewComponent,
  ],
  templateUrl: './product-view-to-buy.component.html',
  styleUrl: './product-view-to-buy.component.css',
})
export class ProductViewToBuyComponent implements OnInit {
  private _productService = inject(ProductService);
  private _reviewService = inject(ReviewService);

  ngOnInit(): void {
    this._productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.title = product.name;
        this.price = product.price;
        this.description = product.description;
        this.imageUrl = product.imageUrl;

        this._reviewService.getTopByProductId(product.productID, 6).subscribe({
          next: (reviews) => {
            this.reviews = reviews;
          },
        });
      },
    });
  }
  reviews: ReviewModel[] = [];
  title: string = 'abc';
  price: number = 123;
  imageUrl?: string = '';
  rating?: number = 3;
  description?: string = 'lorem';
  @Input({ required: true }) productId!: number;
}
