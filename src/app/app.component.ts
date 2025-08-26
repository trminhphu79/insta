import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IonApp,
  IonFooter,
  IonRouterOutlet,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
} from '@ionic/angular/standalone';
import {
  search,
  squareOutline,
  personCircleOutline,
  closeOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { InstallPromptService } from '@shared/services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonIcon,
    IonButtons,
    IonFooter,
    IonToolbar,
    IonButton,
    IonRouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    addIcons({ search, squareOutline, personCircleOutline, closeOutline });
  }

  svc = inject(InstallPromptService);

  async install() {
    const ok = await this.svc.promptInstall();
    console.log('Install accepted?', ok);
  }
}
