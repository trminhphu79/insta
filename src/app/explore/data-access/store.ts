import { Injectable, effect, linkedSignal, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { SocialApi } from '@shared/apis';
import { SearchModeEnum, ExploreState } from './types';
import { ISuggestion } from '@shared/interfaces/social.interface';

@Injectable()
export class ExploreStore {
  constructor(private api: SocialApi) {
    effect(() => {
      const q = this.query();
      const token = ++this.reqToken;
      if (!q) {
        this.patch({
          loading: false,
          error: null,
          query: '',
          mode: SearchModeEnum.NONE,
        });
        return;
      }

      this.patch({
        mode: SearchModeEnum.SEARCHING,
        loading: true,
      });

      this.api
        .suggestion(q)
        .pipe()
        .subscribe((response) => {
          console.log('Response: ', response);
          this.patch({ loading: false, suggestions: response.data });
        });

      // this.api
      //   .searchPost<IPost[]>({ q, limit: 10, offset: 0 })
      //   .pipe(
      //     tap((response) => {
      //       if (token !== this.reqToken) return;
      //       this.patch({
      //         dataSource: response.data ?? [],
      //         loading: false,
      //         searching: false,
      //         error: null,
      //       });
      //     }),
      //     catchError((err) => {
      //       if (token !== this.reqToken) return;
      //       this.patch({
      //         dataSource: [],
      //         loading: false,
      //         searching: false,
      //         error: err?.message ?? 'Search failed',
      //       });
      //       return err;
      //     })
      //   )
      //   .subscribe();
    });
  }

  searchControl = new FormControl<string>('', { nonNullable: true });
  debounceMs = 250;

  private debouncedQuery = toSignal(
    this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value ?? ''),
      debounceTime(this.debounceMs),
      distinctUntilChanged()
    ),
    { initialValue: this.searchControl.value ?? '' }
  );

  readonly query = linkedSignal(() => this.debouncedQuery().trim());

  private state = signal<ExploreState>({
    dataSource: [],
    suggestions: [],
    recentSuggestions: [],
    loading: false,
    error: null,
    query: '',
    mode: SearchModeEnum.NONE,
  });

  private reqToken = 0;

  readonly mode = linkedSignal(() => this.state().mode);
  readonly count = linkedSignal(() => this.state().dataSource.length);
  readonly error = linkedSignal(() => this.state().error);
  readonly isEmpty = linkedSignal(
    () => !this.loading() && this.count() === 0 && !!this.queryText()
  );
  readonly queryText = linkedSignal(() => this.state().query);
  readonly hasResult = linkedSignal(() => !this.loading() && this.count() > 0);
  readonly loading = linkedSignal(() => this.state().loading);
  readonly suggestions = linkedSignal(() => this.state().suggestions);
  readonly dataSource = linkedSignal(() => this.state().dataSource);

  patch(p: Partial<ExploreState>) {
    this.state.update((s) => ({ ...s, ...p }));
  }

  reset() {
    this.reqToken++;
    this.searchControl.setValue('', { emitEvent: true });
    this.query.set('');
    this.patch({
      dataSource: [],
      loading: false,
      error: null,
      query: '',
      mode: SearchModeEnum.NONE,
    });
  }

  search(term: string) {
    this.query.set((term ?? '').trim());
  }

  // using arrow function to keep the explore store context ( this )
  onControlFocus = (value: boolean) => {
    if (this.searchControl.value) return;
    if (value) {
      this.patch({ mode: SearchModeEnum.RECENT });
    } else {
      this.patch({ mode: SearchModeEnum.NONE });
    }
  };

  onSelectSuggestion = (item: ISuggestion) => {
    console.log(this);
    this.patch({ loading: true });
    this.api
      .searchPost({ q: item.keyword, limit: 10, offset: 0 })
      .subscribe((response) => {
        this.patch({
          loading: false,
          mode: SearchModeEnum.NONE,
          dataSource: response.data,
        });
      });
  };
}
