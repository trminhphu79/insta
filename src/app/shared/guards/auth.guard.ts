import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '@shared/store/auth.store';
import { of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

export const authCanActivePage = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return of(authStore.isAuthenticated()).pipe(
    tap(() => console.log('Start auth...')),
    delay(1500),
    map((isAuth) => {
      // console.log('End auth...', isAuth);
      // return !isAuth ? true : router.createUrlTree(['/auth']);
      return true
    })
  );
};
