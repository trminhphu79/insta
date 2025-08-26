import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { SocialApi } from '@shared/apis';
import { IPost } from '@shared/interfaces/post.interface';
import { EMPTY, take } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

type SearchState = {
  dataSource: IPost[];
  loading: boolean;
  error: string | null;
  query: string;
};

@Injectable()
export class SearchStore {
  private api = inject(SocialApi);
  searchControl = new FormControl(null);
  debounceTime = 250;

  // --- state
  private state = signal<SearchState>({
    dataSource: [],
    loading: false,
    error: null,
    query: '',
  });

  // --- selectors
  readonly dataSource = computed(() => this.state().dataSource);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly query = computed(() => this.state().query);
  readonly count = computed(() => this.state().dataSource.length);
  readonly hasResult = computed(() => !this.loading() && this.count() > 0);
  readonly isEmpty = computed(
    () => !this.loading() && this.count() === 0 && !!this.query()
  );

  // --- helpers
  private patch(p: Partial<SearchState>) {
    this.state.update((s) => ({ ...s, ...p }));
  }

  reset() {
    this.patch({ dataSource: [], loading: false, error: null, query: '' });
  }

  registerValueChanges() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        startWith(''),
        filter((key) => !!key),
        tap((keyword) => {
          this.patch({ loading: true, error: null, query: keyword + '' });
          console.log('Keyword changes...', keyword);
        }),
        switchMap((q) =>
          this.api.searchPost<IPost[]>({ q: q + '', limit: 10, offset: 0 })
        ),
        tap((response) => {
          console.log('response: ', response);
        }),
        catchError((err) => {
          this.patch({
            loading: false,
            error: err?.message,
            dataSource: [],
          });
          return err;
        })
      )
      .subscribe();
  }
}
