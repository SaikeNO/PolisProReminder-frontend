import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Policy } from '../../shared/interfaces/policy';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PoliciesSerivce {
  private http = inject(HttpClient);

  getPolicies(startIndex: number = 1, pageSize: number = 10) {
    return this.http.get<Policy[]>(`${environment.API_URL}/policy`, {
      params: {
        startIndex,
        pageSize,
      },
    });
  }
}
