import {
  ChangeDetectionStrategy,
  Component,
  inject,
  computed,
} from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {
  IonRouterOutlet,
  IonContent,
  IonHeader,
  IonToolbar
} from '@ionic/angular/standalone';
import { AuthStore } from '@shared/store/auth.store';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

function collectRouteData(rootSnapshot: ActivatedRouteSnapshot) {
  let data: Record<string, any> = { ...(rootSnapshot.data || {}) };
  let cur = rootSnapshot.firstChild;
  while (cur) {
    data = { ...data, ...(cur.data || {}) };
    cur = cur.firstChild!;
  }
  return data;
}

@Component({
  selector: 'insta-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    FooterComponent,
    HeaderComponent,
    IonRouterOutlet,
    IonContent,
    IonHeader,
    IonToolbar
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  authStore = inject(AuthStore);
  private router = inject(Router);

  private routeData$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    startWith(null),
    map(() => collectRouteData(this.router.routerState.snapshot.root))
  );

  routeData = toSignal(this.routeData$, {
    initialValue: {} as Record<string, any>,
  });

  // Example consumption
  hideHeader = computed(() => !!this.routeData()['hideHeader']);
  currentUser = this.authStore.currentUser;
}
