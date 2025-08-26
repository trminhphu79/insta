import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ExploreStore } from '../../data-access/store';
import { IonItem } from '@ionic/angular/standalone';
@Component({
  selector: 'insta-search-suggestion',
  templateUrl: './search-suggestion.component.html',
  styleUrls: ['./search-suggestion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[IonItem]
})
export class SearchSuggestionComponent implements OnInit {
  store = inject(ExploreStore);

  suggestions = this.store.suggestions;
  onSelect = this.store.onSelectSuggestion;
  ngOnInit() {}
}
