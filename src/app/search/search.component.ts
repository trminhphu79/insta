import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { SearchListComponent } from './features/search-list/search-list.component';
import { SearchInputComponent } from '../shared/uis/components/search-input/search-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchStore } from './features/data-access/store';

@Component({
  selector: 'insta-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchStore],
  imports: [SearchListComponent, SearchInputComponent, ReactiveFormsModule],
})
export class SearchComponent {
  private searchStore = inject(SearchStore);
  searchControl = this.searchStore.searchControl;

  ngOnInit() {
    this.searchStore.registerValueChanges();
  }
}
