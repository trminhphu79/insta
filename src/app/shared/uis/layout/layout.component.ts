import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { AuthStore } from '@shared/store/auth.store';

@Component({
  selector: 'insta-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [FooterComponent, HeaderComponent, IonRouterOutlet, IonContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  authStore = inject(AuthStore);
  currentUser = this.authStore.currentUser;
}
