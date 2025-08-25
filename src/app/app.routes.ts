import { Routes } from '@angular/router';
import { authCanActivePage } from '@shared/guards';

export const routes: Routes = [
  {
    path: '',
    canMatch: [authCanActivePage],
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.authRoutes),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.routes').then((c) => c.profileRoutes),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
