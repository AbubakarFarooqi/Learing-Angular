import { Route, Router, Routes, UrlTree } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from './products/products.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ProductViewToBuyComponent } from './product-view-to-buy/product-view-to-buy.component';
import { SearchedProductsComponent } from './searched-products/searched-products.component';
import { CartComponent } from './cart/cart.component';

// const TokenValidation: CanMatchFn = (route, segments) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   if (authService.isTokenValid()) {
//     return true;
//   }
//   const subscription = authService.getNewAccessToken().subscribe({
//     next: () => {
//       return true;
//     },
//     error: () => {
//       return new RedirectCommand(router.parseUrl('login'));
//     },
//   });
//   return new RedirectCommand(router.parseUrl('login'));
// };

const TokenValidation: (route: Route) => Observable<boolean | UrlTree> = (
  route
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isTokenValid()) {
    return of(true);
  }
  return authService.getNewAccessToken().pipe(
    map(() => true),
    catchError(() =>
      of(router.parseUrl(`/login?returnUrl=${encodeURIComponent(route.path!)}`))
    )
  );
};

export const routes: Routes = [
  {
    path: 'product/searched-product',
    component: SearchedProductsComponent,
  },
  {
    path: 'product-view/:productId',
    component: ProductViewToBuyComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'products',
    //canMatch: [TokenValidation],
    component: ProductsComponent,
  },
  {
    path: 'products/:categoryId/:categoryName',
    component: ProductsByCategoryComponent,
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];
