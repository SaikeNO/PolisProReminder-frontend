import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreatePolicy, Policy } from '../../shared/interfaces/policy';
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

  getLatestPolicies(count: number) {
    return this.http.get<Policy[]>(`${this.url}/Policy/Latest`, { params: { count } });
  }

  // getInsurerPolicies(insurerId: number) {
  //   return this.http.get<Policy[]>(`${this.url}/Policy/Insurer/${insurerId}`);
  // }

  createPolicy(policy: CreatePolicy) {
    return this.http.post<void>(`${this.url}/Policy`, policy);
  }

  editPolicy(policy: CreatePolicy, id: number) {
    return this.http.put<void>(`${this.url}/Policy/${id}`, policy);
  }

  deletePolicy(policyId: number) {
    return this.http.delete<void>(`${this.url}/Policy/${policyId}`);
  }
}
