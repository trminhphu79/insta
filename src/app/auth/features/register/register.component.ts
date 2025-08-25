import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthStore } from '@shared/store/auth.store';
import {
  controlsMatchValidator,
  passwordValidator,
  withValidation,
} from '@shared/utils';
import {
  IonText,
  IonItem,
  IonButton,
  IonInput,
  IonSpinner,
  IonInputPasswordToggle,
} from '@ionic/angular/standalone';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'insta-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent {
  private readonly authStore = inject(AuthStore);
  private readonly toastService = inject(ToastService);

  protected isLoading = this.authStore.loading;

  protected passwordMessages: Record<string, string> = {
    minLength: 'Password must be at least 8 characters long.',
    maxLength: 'Password must not exceed 20 characters.',
    uppercase: 'Password must contain at least one uppercase letter.',
    number: 'Password must contain at least one number.',
  };

  protected form: FormGroup = new FormGroup(
    {
      email: new FormControl(
        null,
        withValidation([Validators.email, Validators.required])
      ),
      username: new FormControl(null, withValidation([Validators.required])),
      password: new FormControl(
        null,
        withValidation([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          passwordValidator(),
        ])
      ),
      confirmPassword: new FormControl(
        null,
        withValidation([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          passwordValidator(),
        ])
      ),
    },
    { validators: [controlsMatchValidator('password', 'confirmPassword')] }
  );

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authStore.register(this.form.value);
  }
}
