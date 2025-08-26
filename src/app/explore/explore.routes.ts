import { Routes } from '@angular/router';

export const exploreRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./explore.component').then((c) => c.ExploreComponent),
  },
];
