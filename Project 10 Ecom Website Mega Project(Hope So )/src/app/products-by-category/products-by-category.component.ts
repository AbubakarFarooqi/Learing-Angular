import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products-by-category',
  standalone: true,
  imports: [ProductCardComponent, PaginatorModule],
  templateUrl: './products-by-category.component.html',
  styleUrl: './products-by-category.component.css',
})
export class ProductsByCategoryComponent implements OnInit {
  @Input({ required: true }) categoryId!: number;
  @Input({ required: true }) categoryName!: string;
  private _productService = inject(ProductService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  products: Product[] = [];
  totalProducts?: number;
  pageSize: number = 16;
  currentPage: number = 0;

  ngOnInit(): void {
    this._productService
      .getTotalProductsForSpecificCategory(this.categoryId)
      .subscribe({
        next: (count) => {
          this.totalProducts = count;
        },
      });

    this.currentPage = this.currentPage + 1;
    const subscription = this._productService
      .getPaginatedProductsByCategory(
        this.categoryId,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (data) => {
          this.products = this.products?.concat(data);
        },
      });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onPageChange(event: PaginatorState) {
    this.currentPage = event.page! + 1;
    console.log(this.currentPage + 'AzanAli');
    const subscription = this._productService
      .getPaginatedProductsByCategory(
        this.categoryId,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (data) => {
          this.products = data;
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
