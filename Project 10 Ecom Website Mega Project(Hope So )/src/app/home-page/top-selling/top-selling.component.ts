import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../models/product.model';
import { CustomButtonComponent } from '../../shared/custom-button/custom-button.component';
@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [ProductCardComponent, CustomButtonComponent],
  templateUrl: './top-selling.component.html',
  styleUrl: './top-selling.component.css',
})
export class TopSellingComponent {
  private _productService = inject(ProductService);
  private _destroyRef = inject(DestroyRef);
  products: Product[] = [];
  constructor() {
    const subscription = this._productService.getPaginatedProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = this.products?.concat(data);
      },
    });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get isPageAvailable() {
    return this._productService.isPageAvailable();
  }
  onViewMore() {
    const subscription = this._productService.getPaginatedProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = this.products?.concat(data);
      },
    });
    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
