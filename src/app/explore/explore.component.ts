import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { SearchInputComponent } from '../shared/uis/components/search-input/search-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExploreStore } from './data-access/store';
import { SearchSuggestionComponent } from './features/search-suggestion/search-suggestion.component';
import { RecentSuggestionComponent } from './features/recent-suggestion/recent-suggestion.component';
import { SearchModeEnum } from './data-access/types';
import { SearchResultsComponent } from './features/search-results/search-results.component';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'insta-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExploreStore],
  imports: [
    SearchResultsComponent,
    SearchInputComponent,
    ReactiveFormsModule,
    SearchSuggestionComponent,
    RecentSuggestionComponent,
    IonContent,
  ],
})
export class ExploreComponent {
  private store = inject(ExploreStore);

  protected mode = this.store.mode;
  protected searchControl = this.store.searchControl;
  protected onControlFocus = this.store.onControlFocus;

  protected searchMode = SearchModeEnum;
}
