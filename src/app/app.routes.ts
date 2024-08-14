import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard.component'),
      },
      {
        path: 'product/:productId',
        loadComponent: () =>
          import('./features/product/pages/product/product.component'),
      },
      {
        path: 'wishlist',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/wishlist/pages/wishlist/wishlist.component'),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./features/search/pages/search/search.component'),
      },
      {
        path: 'cart',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/cart/pages/cart/cart.component'),
      },
    ],
  },
];
