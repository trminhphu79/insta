import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'insta-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [IonContent],
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
