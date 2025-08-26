import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'insta-search-suggestion',
  templateUrl: './search-suggestion.component.html',
  styleUrls: ['./search-suggestion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSuggestionComponent implements OnInit {
  ngOnInit() {}
}
