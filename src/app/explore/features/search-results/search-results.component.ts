import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'insta-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
