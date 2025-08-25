import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./profile.component').then((c) => c.ProfileComponent),
  },
];
