import { Routes } from '@angular/router';
import { BlankLayoutsComponent } from './layouts/blank-layouts/blank-layouts.component';
import { AuthLayoutsComponent } from './layouts/auth-layouts/auth-layouts.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { logedGuard } from './core/guards/loged/loged.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutsComponent,
    canActivate: [logedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        title: 'login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'register',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import(
            './shared/components/bisinse/forgotpassword/forgotpassword.component'
          ).then((m) => m.ForgotpasswordComponent),
        title: 'forgotPassword',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
        title: 'cart',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'allorders',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'products',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'brands',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'categories',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
        title: 'checkout',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./shared/components/bisinse/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'Details',
      },
      {
        path: 'wishList',
        loadComponent: () =>
          import('./pages/wish-list/wish-list.component').then(
            (c) => c.WishListComponent
          ),
        title: 'wishList',
      },

      { path: '**', component: NotFoundComponent, title: 'notfound' },
    ],
  },
];
