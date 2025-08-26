import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IonApp,
  IonFooter,
  IonRouterOutlet,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { search, personCircleOutline, closeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { InstallPromptService } from '@shared/services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonFooter, IonToolbar, IonButton, IonRouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    addIcons({ search, personCircleOutline, closeOutline });
  }

  install = inject(InstallPromptService);

  async onInstall() {
    const accepted = await this.install.promptInstall();
    console.log('User install outcome:', accepted);
  }
}
