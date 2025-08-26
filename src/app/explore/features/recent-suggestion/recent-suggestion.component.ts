import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ExploreStore } from '../../data-access/store';
import { IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'insta-recent-suggestion',
  templateUrl: './recent-suggestion.component.html',
  styleUrls: ['./recent-suggestion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonItem],
})
export class RecentSuggestionComponent implements OnInit {
  store = inject(ExploreStore);

  suggestions = this.store.suggestions;
  onSelect = this.store.onSelectSuggestion;
  ngOnInit() {}
}
