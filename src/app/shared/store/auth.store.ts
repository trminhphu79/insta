import { Injectable, computed, inject, signal } from '@angular/core';
import { catchError, EMPTY, firstValueFrom, tap } from 'rxjs';
import { LoginDto, LoginResponse, RegisterDto, User } from './auth.types';
import { AuthApi } from '@shared/apis';
import { StorageService } from '@shared/services/storage.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastService } from '@shared/services/toast.service';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
};

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private storage = inject(StorageService);
  private nav = inject(NavController);
  private toastService = inject(ToastService);

  private state = signal<AuthState>({
    user: null,
    accessToken: this.storage.getAccess(),
    refreshToken: this.storage.getRefresh(),
    loading: false,
    error: null,
  });

  readonly getState = computed(() => this.state());
  readonly isAuthenticated = computed(
    () => !!this.state().accessToken && !!this.state().user
  );
  readonly currentUser = computed(() => this.state().user);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  readonly api = inject(AuthApi);

  update<T>(value: T, key: 'selectedTab') {
    this.state.update((s) => ({ ...s, [key]: value }));
  }

  hydrate(user: User | null) {
    this.state.update((s) => ({
      ...s,
      user,
      accessToken: this.storage.getAccess(),
      refreshToken: this.storage.getRefresh(),
    }));
  }

  login(dto: LoginDto) {
    this.setLoading(true);
    console.log('dto:', dto);
    this.api
      .login<LoginDto, LoginResponse>(dto)
      .pipe(
        tap(({ data }) => {
          this.storage.setAccess(data.accessToken ?? null);
          this.storage.setRefresh(data.refreshToken ?? null);
          this.state.update((s) => ({
            ...s,
            user: data.user,
            accessToken: data.accessToken ?? null,
            refreshToken: data.refreshToken ?? null,
            loading: false,
            error: null,
          }));
          this.nav.navigateRoot('/', { animated: false });
        }),
        catchError((e) => {
          console.log('Error: ', e);
          this.toastService.openToast({
            color: 'danger',
            message: e?.error?.message || e?.message || 'LOGIN_FAILED',
          });
          this.fail(e?.error?.message || e?.message || 'LOGIN_FAILED');
          return EMPTY;
        })
      )
      .subscribe();
  }

  register(dto: RegisterDto) {
    this.setLoading(true);
    this.api
      .register(dto)
      .pipe(
        tap((res) => {
          this.state.update((s) => ({
            ...s,
            loading: false,
            error: null,
          }));
          this.nav.navigateRoot('/', { animated: false });
        }),
        catchError((e) => {
          console.log('Error: ', e);
          this.toastService.openToast({
            color: 'danger',
            message: e?.error?.message || e?.message || 'LOGIN_FAILED',
          });
          this.fail(e?.error?.message || e?.message || 'REGISTER_FAILED');
          return EMPTY;
        })
      )
      .subscribe();
  }

  logout() {
    this.storage.setAccess(null);
    this.storage.setRefresh(null);
    this.state.update((s) => ({
      ...s,
      user: null,
      accessToken: null,
      refreshToken: null,
      error: null,
    }));
  }

  private setLoading(v: boolean) {
    this.state.update((s) => ({ ...s, loading: v, error: v ? null : s.error }));
  }

  private fail(message: string) {
    this.state.update((s) => ({ ...s, loading: false, error: message }));
  }
}
