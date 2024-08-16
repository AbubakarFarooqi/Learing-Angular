import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-products-by-category',
  standalone: true,
  imports: [ProductCardComponent, PaginatorModule],
  templateUrl: './products-by-category.component.html',
  styleUrl: './products-by-category.component.css',
})
export class ProductsByCategoryComponent implements OnInit {
  ngOnInit(): void {
    this._productService
      .setTotalPagesForSpecificCategory(this.categoryId)
      .subscribe({
        next: (count) => {
          this.totalProducts = count;
          console.log(this.totalProducts + 'AzanAli');
        },
      });
    this._productService.pageSize = 16;
    this.pageSize = 16;
    this._productService.currentPage = 0;
    const subscription = this._productService
      .getPaginatedProductsByCategory(this.categoryId)
      .subscribe({
        next: (data) => {
          this.products = this.products?.concat(data);
        },
      });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  @Input({ required: true }) categoryId!: number;
  @Input({ required: true }) categoryName!: string;
  private _productService = inject(ProductService);
  private _destroyRef = inject(DestroyRef);
  products: Product[] = [];
  totalProducts?: number;
  pageSize?: number;

  onPageChange(event: PaginatorState) {
    const subscription = this._productService
      .getPaginatedProductsByCategory(this.categoryId)
      .subscribe({
        next: (data) => {
          this.products = data;
        },
      });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
