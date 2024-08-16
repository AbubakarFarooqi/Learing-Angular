import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { TopFourProducts } from '../../models/topFourProduct.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  _productService = inject(ProductService);
  fourProducts: TopFourProducts[] = [];
  constructor() {
    this._productService.getFourProductOfEachCategory().subscribe({
      next: (data) => {
        this.fourProducts = data;
      },
    });
  }
}
