import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from './products/products.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/:categoryId/:categoryName',
    component: ProductsByCategoryComponent,
  },
  {
    path: '',
    // component: HomePageComponent,
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
