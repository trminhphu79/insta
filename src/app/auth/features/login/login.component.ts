import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonItem,
  IonButton,
  IonInput,
  IonText,
  IonSpinner,
  IonInputPasswordToggle,
} from '@ionic/angular/standalone';
import { AuthStore } from '@shared/store/auth.store';
import { withValidation } from '@shared/utils';

@Component({
  selector: 'insta-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonText,
    IonItem,
    IonButton,
    IonInput,
    IonSpinner,
    ReactiveFormsModule,
    IonInputPasswordToggle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  authStore = inject(AuthStore);
  protected isLoading = this.authStore.loading;

  protected form: FormGroup = new FormGroup({
    email: new FormControl(
      null,
      withValidation([Validators.email, Validators.required])
    ),
    password: new FormControl(
      null,
      withValidation([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ])
    ),
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authStore.login(this.form.getRawValue());
  }
}
