import { Injectable } from '@angular/core';
import { BaseApi } from './base-api.service';
import { IBaseResponse } from '@shared/interfaces/response.interface';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApi extends BaseApi {
  constructor() {
    super();
  }

  login<T, K>(body: T) {
    const endpoint = `${this.baseUrl}/auth/login`;
    return this.httpClient.post<IBaseResponse<K>>(endpoint, body);
  }

  register<T, K>(body: T) {
    const endpoint = `${this.baseUrl}/auth/register`;
    return this.httpClient.post<IBaseResponse<K>>(endpoint, body);
  }

  logout<T, K>(body: T) {
    const endpoint = `${this.baseUrl}/auth/logout`;
    return this.httpClient.post<IBaseResponse<K>>(endpoint, body);
  }
}
