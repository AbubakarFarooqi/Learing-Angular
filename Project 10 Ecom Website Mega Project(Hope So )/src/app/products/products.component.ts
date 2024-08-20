import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { TopFourProducts } from '../../models/topFourProduct.model';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private _router = inject(Router);

  _productService = inject(ProductService);
  fourProducts: TopFourProducts[] = [];
  constructor() {
    this._productService.getFourProductOfEachCategory().subscribe({
      next: (data) => {
        this.fourProducts = data;
      },
    });
  }

  onProductClick($event: Product) {
    this._router.navigate(['product-view', $event.productID]);
  }
}
