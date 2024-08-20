import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = 0;
      this.searchString = params['searchString'];
      //console.log('Azan' + params['searchString']);
      console.log(this.searchString);
      this.currentPage = this.currentPage + 1;
      console.log(this.currentPage);
      const subscription = this._productService
        .getPaginatedProductsThatMatchName(
          this.searchString,
          this.currentPage,
          this.pageSize
        )
        .subscribe({
          next: (data) => {
            this.products = data;
          },
          error: (e) => {
            console.log(e);
          },
        });
      this._destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    });
  }

  private _productService = inject(ProductService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  searchString!: string;
  products: Product[] = [];
  totalProducts?: number;
  pageSize: number = 16;
  currentPage: number = 1;

  onProductClick($event: Product) {
    this._router.navigate(['product-view', $event.productID]);
  }
}
