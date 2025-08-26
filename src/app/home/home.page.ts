import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import {
  FeedItem,
  FeedsComponent,
} from '@shared/uis/components/feeds/feeds.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    FeedsComponent,
  ],
})
export class HomePage {
  router = inject(Router);
  constructor() {}
  toLogin() {
    this.router.navigateByUrl('/auth');
  }

  onFeedClicked(item: FeedItem) {
    console.log('onFeedClicked: ', item);
  }
}
