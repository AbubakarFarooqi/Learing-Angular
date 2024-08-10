import { Component, Input } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [StarRatingComponent, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) price!: number;
  @Input() rating?: number;
}
