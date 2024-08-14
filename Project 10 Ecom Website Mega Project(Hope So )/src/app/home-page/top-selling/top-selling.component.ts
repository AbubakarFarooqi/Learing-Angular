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
  products: Product[] = [];
  newProducts: Product[] = [];
  divParentState: 'expanded' = 'expanded';

  constructor() {
    const subscription = this._productService.getPaginatedProducts().subscribe({
      next: (data) => {
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

    // // this.isTempHeight = true;
    // this.newProducts = this.newProducts?.concat(...this.products);
    // // this.products = this.products?.concat(...this.products);
    // //if (finalHeight > initialHeight) {
    // // this.divParentState =
    // //   this.divParentState === 'collapsed' ? 'expanded' : 'collapsed';
    // setTimeout(() => {
    //   console.log(this.productsDiv);
    //   // Store the final height
    //   const finalHeight = this.productsDiv.nativeElement.offsetHeight;

    //   // If the height has changed significantly, toggle the state
    //   //if (finalHeight > initialHeight) {
    //   // this.isTempHeight = false;
    //   this.divParentState = 'expanded';
    //   // this.divParentState === 'collapsed' ? 'expanded' : 'collapsed';
    //   //}
    // }, 1);
  }
}
