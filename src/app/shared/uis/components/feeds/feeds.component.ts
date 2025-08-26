import { Component, input, output } from '@angular/core';

export type FeedItem = {
  type: 'media' | 'image';
  author: {
    avatarUrl: string;
    id: string;
    username: string;
  };
  read: boolean;
};
@Component({
  selector: 'insta-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
})
export class FeedsComponent {
  data = input.required<FeedItem[]>();

  onClick = output<FeedItem>();
}
