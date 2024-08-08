import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

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
        loadComponent: () =>
          import('./features/wishlist/pages/wishlist/wishlist.component'),
      },
    ],
  },
];
