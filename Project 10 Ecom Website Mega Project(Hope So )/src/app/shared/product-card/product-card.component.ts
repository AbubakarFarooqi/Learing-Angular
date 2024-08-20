import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../models/product.model';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [StarRatingComponent, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) productId!: number;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) price!: number;
  @Input({ required: true }) description?: string;
  @Input() rating?: number;
  @Output() productClick = new EventEmitter<Product>();

  onProductclick() {
    this.productClick.emit({
      productID: this.productId,
      name: this.title,
      description: this.description,
      price: this.price,
      imageUrl: this.imageUrl,
    });
  }
}
