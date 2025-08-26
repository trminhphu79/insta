import { Injectable } from '@angular/core';
import { BaseApi } from './base-api.service';
import { IBaseResponse } from '@shared/interfaces/response.interface';

@Injectable({ providedIn: 'root' })
export class SocialApi extends BaseApi {
  searchPost<T>(payload: { q: string; limit: number; offset: number }) {
    const endpointUrl = `${this.baseUrl}/social/post/search`;
    return this.httpClient.post<IBaseResponse<T>>(endpointUrl, payload);
  }
}
