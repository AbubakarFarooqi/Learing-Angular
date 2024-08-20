import { Component, inject } from '@angular/core';
import {
  NgSelectModule,
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { debounce, map, Observable, startWith } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NgFor,
    AsyncPipe,
    NgSelectModule,
    NgSelectComponent,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
    FormsModule,
  ],
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private _productService = inject(ProductService);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  productSearchNames: string[] = [];
  selectedProduct?: string;
  get isUserLoggedIn() {
    return this._authService.isTokenValid();
  }
  searchForm = new FormGroup({
    searchInput: new FormControl('', [Validators.required]),
  });

  onTypingInSearch(event: { term: string; items: any[] }) {
    if (event.term === '') {
      this.productSearchNames = [];
    }
    this._productService.getPaginatedProductNames(event.term, 1, 10).subscribe({
      next: (names) => {
        this.productSearchNames = names;
        console.log(names);
      },
    });
  }
  onEnter() {
    if (this.selectedProduct != null) {
      this._router.navigate(['product/searched-product'], {
        queryParams: { searchString: this.selectedProduct },
      });
    }
  }
  onSearch() {
    if (this.searchForm.invalid) {
      return;
    }
    // Implement Search logic here in future
    this.searchForm.reset();
  }

  onLogoutClick() {
    const confirmLogout = window.confirm('Do you want to logout');
    if (confirmLogout) {
      this._authService.logout();
      this._router.navigate([''], { replaceUrl: true });
    }
  }
  onLoginClick() {
    this._router.navigate(['login']);
  }
  onCartClick() {
    this._router.navigate(['cart']);
  }
}
