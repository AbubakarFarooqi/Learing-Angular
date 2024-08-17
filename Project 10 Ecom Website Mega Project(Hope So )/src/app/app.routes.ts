import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from './products/products.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

const TokenValidation: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isTokenValid()) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('login'));
};

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    component: HomePageComponent,
    // component: LoginComponent,
  },
  {
    path: 'products',
    canMatch: [TokenValidation],
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
