import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'insta-recent-suggestion',
  templateUrl: './recent-suggestion.component.html',
  styleUrls: ['./recent-suggestion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentSuggestionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
