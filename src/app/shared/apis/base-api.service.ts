import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CONFIG_TOKEN } from '@shared/utils/env-config.util';

@Injectable({ providedIn: 'root' })
export class BaseApi {
  protected baseUrl!: string;

  protected config = inject(CONFIG_TOKEN);
  protected httpClient = inject(HttpClient);

  constructor() {
    this.baseUrl = this.config.apiUrl;
  }
}
