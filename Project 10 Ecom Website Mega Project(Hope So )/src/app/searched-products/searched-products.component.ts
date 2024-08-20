import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-searched-products',
  standalone: true,
  imports: [ProductCardComponent, PaginatorModule],
  templateUrl: './searched-products.component.html',
  styleUrl: './searched-products.component.css',
})
export class SearchedProductsComponent implements OnInit {
  ngOnInit(): void {
    // this._productService
    //   .getTotalProductsForSpecificCategory(this.categoryId)
    //   .subscribe({
    //     next: (count) => {
    //       this.totalProducts = count;
    //     },
    //   });
    // this.currentPage = this.currentPage + 1;
    // const subscription = this._productService
    //   .getPaginatedProductsThatMatchName(
    //     this.searchString,
    //     this.currentPage,
    //     this.pageSize
    //   )
    //   .subscribe({
    //     next: (data) => {
    //       this.products = this.products?.concat(data);
    //     },
    //   });
    // this._destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }

  private _productService = inject(ProductService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  @Input({ required: true }) searchString!: string;
  products: Product[] = [];
  totalProducts?: number;
  pageSize: number = 16;
  currentPage: number = 0;

  onProductClick($event: Product) {
    this._router.navigate(['product-view', $event.productID]);
  }
}
