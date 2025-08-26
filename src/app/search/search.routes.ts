import { Routes } from '@angular/router';

export const searchRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./search.component').then((c) => c.SearchComponent),
  },
];
