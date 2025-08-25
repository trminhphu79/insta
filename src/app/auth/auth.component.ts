import {
  ChangeDetectionStrategy,
  Component,
  linkedSignal,
  signal,
} from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';

enum AuthTabEnum {
  LOGIN,
  REGISTER,
}

@Component({
  selector: 'insta-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [IonButton, IonContent, LoginComponent, RegisterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  protected authTabEnum = AuthTabEnum;
  protected selectedTab = signal<AuthTabEnum>(AuthTabEnum.LOGIN);

  protected actionLabel = linkedSignal(() =>
    this.selectedTab() == AuthTabEnum.LOGIN
      ? 'Create new account'
      : 'Login with account'
  );

  actionClick() {
    if (this.selectedTab() == AuthTabEnum.LOGIN) {
      this.selectedTab.set(AuthTabEnum.REGISTER);
      return;
    }
    this.selectedTab.set(AuthTabEnum.LOGIN);
  }
}
