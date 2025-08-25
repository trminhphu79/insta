import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private ACCESS_KEY = 'accessToken';
  private REFRESH_KEY = 'refreshToken';

  // --- Access Token ---
  getAccess(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  setAccess(token: string | null): void {
    if (token) {
      localStorage.setItem(this.ACCESS_KEY, token);
    } else {
      localStorage.removeItem(this.ACCESS_KEY);
    }
  }

  // --- Refresh Token ---
  getRefresh(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  setRefresh(token: string | null): void {
    if (token) {
      localStorage.setItem(this.REFRESH_KEY, token);
    } else {
      localStorage.removeItem(this.REFRESH_KEY);
    }
  }

  // --- Utility: clear all tokens ---
  clear(): void {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
  }
}
