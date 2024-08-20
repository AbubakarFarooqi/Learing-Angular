import { Component, DestroyRef, inject } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../models/product.model';
import { CustomButtonComponent } from '../../shared/custom-button/custom-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [ProductCardComponent, CustomButtonComponent],
  templateUrl: './top-selling.component.html',
  styleUrl: './top-selling.component.css',

  animations: [
    trigger('divParent', [
      state('expanded', style({ overflow: 'hidden', height: '100%' })),
      transition('* <=> *', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class TopSellingComponent {
  private _productService = inject(ProductService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  totalPages?: number;
  pageSize: number = 4;
  currentPage: number = 0;
  products: Product[] = [];
  newProducts: Product[] = [];
  divParentState: 'expanded' = 'expanded';

  constructor() {
    const subscriptionOfProductsCount = this._productService
      .getProductsCount()
      .subscribe({
        next: (count: number) => {
          this.totalPages = Math.ceil(count / this.pageSize);
        },
      });
    this._destroyRef.onDestroy(() => {
      subscriptionOfProductsCount.unsubscribe();
    });
    this.currentPage = this.currentPage + 1;
    const subscription = this._productService
      .getPaginatedProducts(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.products = this.products?.concat(data);
        },
      });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get isPageAvailable() {
    if (this.currentPage + 1 > this.totalPages!) {
      return false;
    }
    return true;
  }

  onViewMore() {
    this.currentPage = this.currentPage + 1;
    const subscription = this._productService
      .getPaginatedProducts(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          // this.products = this.products?.concat(data);
          this.newProducts = this.newProducts?.concat(data);

          setTimeout(() => {
            this.divParentState = 'expanded';
          }, 0);
        },
      });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onProductClick($event: Product) {
    this._router.navigate(['product-view', $event.productID]);
  }
}
