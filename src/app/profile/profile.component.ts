import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'insta-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [IonContent],
})
export class ProfileComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
