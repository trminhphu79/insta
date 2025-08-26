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

  protected searchMode = SearchModeEnum;

  focusChange(value: boolean) {
    if (this.searchControl.value) return;
    if (value) {
      this.store.patch({ mode: SearchModeEnum.RECENT });
    } else {
      this.store.patch({ mode: SearchModeEnum.NONE });
    }
  }
}
