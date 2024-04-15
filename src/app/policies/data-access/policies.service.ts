import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Policy } from '../../shared/interfaces/policy';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PoliciesService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getPolicies(startIndex: number = 1, pageSize: number = 10) {
    return this.http.get<Policy[]>(`${this.url}/policy`, {
      params: {
        startIndex,
        pageSize,
      },
    });
  }
}
