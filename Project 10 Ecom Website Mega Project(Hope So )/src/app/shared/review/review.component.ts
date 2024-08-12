import { Component, Input } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  @Input({ required: true }) userName!: string;
  @Input({ required: true }) rating!: number;
  @Input({ required: true }) comment!: string;
}
