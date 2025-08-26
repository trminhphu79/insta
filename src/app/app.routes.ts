import { Routes } from '@angular/router';
import { authCanActivePage } from '@shared/guards';
import { LayoutComponent } from '@shared/uis/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    canMatch: [authCanActivePage],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.routes').then((c) => c.profileRoutes),
      },
      {
        path: 'search',
        data: {
          hideHeader: true,
        },
        loadChildren: () =>
          import('./search/search.routes').then((c) => c.searchRoutes),
      },
    ],
  },
  {
    path: 'auth',
    pathMatch: 'full',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.authRoutes),
  },

  // {
  //   path: '**',
  //   loadComponent: () =>
  //     import('./not-found/not-found.component').then(
  //       (c) => c.NotFoundComponent
  //     ),
  // },
];
