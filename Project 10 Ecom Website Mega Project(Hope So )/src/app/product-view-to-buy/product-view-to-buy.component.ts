import { Component, inject, Input, OnInit } from '@angular/core';
import { StarRatingComponent } from '../shared/star-rating/star-rating.component';
import { CurrencyPipe } from '@angular/common';
import { CustomButtonComponent } from '../shared/custom-button/custom-button.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-view-to-buy',
  standalone: true,
  imports: [StarRatingComponent, CurrencyPipe, CustomButtonComponent],
  templateUrl: './product-view-to-buy.component.html',
  styleUrl: './product-view-to-buy.component.css',
})
export class ProductViewToBuyComponent implements OnInit {
  private _productService = inject(ProductService);

  ngOnInit(): void {
    this._productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.title = product.name;
        this.price = product.price;
        this.description = product.description;
        this.imageUrl = product.imageUrl;
      },
    });
  }
  title: string = 'abc';
  price: number = 123;
  imageUrl?: string = '';
  rating?: number = 3;
  description?: string = 'lorem';
  @Input({ required: true }) productId!: number;
}
