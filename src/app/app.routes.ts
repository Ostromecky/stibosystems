import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'payments',
        loadChildren: () =>
          import('@stibosystems/payments/feature-payments').then(
            (m) => m.PAYMENTS_ROUTES
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
