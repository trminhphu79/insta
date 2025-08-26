import {
  Injectable,
  computed,
  effect,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { SocialApi } from '@shared/apis';
import { SearchModeEnum, SearchState } from './types';
import { fromEvent, timer } from 'rxjs';

@Injectable()
export class ExploreStore {
  constructor(private api: SocialApi) {
    effect(() => {
      const q = this.query();
      const token = ++this.reqToken;
      if (!q) {
        this.patch({
          dataSource: [],
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

      timer(500).subscribe(() => {
        // this.patch({
        //   mode: SearchModeEnum.NONE,
        //   loading: false,
        //   dataSource: [],
        // });
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

  private state = signal<SearchState>({
    dataSource: [],
    suggestion: [],
    recentSuggestions: [],
    loading: false,
    error: null,
    query: '',
    mode: SearchModeEnum.NONE,
  });

  private reqToken = 0;

  readonly mode = computed(() => this.state().mode);
  readonly count = computed(() => this.state().dataSource.length);
  readonly error = computed(() => this.state().error);
  readonly isEmpty = computed(
    () => !this.loading() && this.count() === 0 && !!this.queryText()
  );
  readonly queryText = computed(() => this.state().query);
  readonly hasResult = computed(() => !this.loading() && this.count() > 0);
  readonly loading = computed(() => this.state().loading);

  readonly dataSource = computed(() => this.state().dataSource);

  patch(p: Partial<SearchState>) {
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

  onControlFocus(value: boolean) {
    if (this.searchControl.value) return;
    if (value) {
      this.patch({ mode: SearchModeEnum.RECENT });
    } else {
      this.patch({ mode: SearchModeEnum.NONE });
    }
  }
}
