import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'insta-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon],
})
export class HeaderComponent {
  userName = input.required();
}
