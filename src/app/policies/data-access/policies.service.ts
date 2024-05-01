import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Policy } from '../../shared/interfaces/policy';
import { environment } from '../../../environments/environment';
import { PageResult } from '../../shared/interfaces/pageResult';
import { GetQuery } from '../../shared/interfaces/getQuery';

@Injectable({ providedIn: 'root' })
export class PoliciesService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getPolicies(query: GetQuery) {
    return this.http.get<PageResult<Policy>>(`${this.url}/policy`, { params: { ...query } });
  }

  getInsurerPolicies(insurerId: number) {
    return this.http.get<Policy[]>(`${this.url}/Policy/Insurer/${insurerId}`);
  }

  deletePolicy(policyId: number) {
    return this.http.delete<void>(`${this.url}/Policy/${policyId}`);
  }
}
