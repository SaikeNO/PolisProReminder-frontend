import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreatePolicy, Policy } from '../../shared/interfaces/policy';
import { environment } from '../../../environments/environment';
import { PageResult } from '../../shared/interfaces/pageResult';
import { GetPoliciesQuery } from '../../shared/interfaces/getQuery';

@Injectable({ providedIn: 'root' })
export class PoliciesService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getPolicies(query: GetPoliciesQuery) {
    return this.http.get<PageResult<Policy>>(`${this.url}/policy`, { params: { ...query } });
  }

  getLatestPolicies(count: number) {
    return this.http.get<Policy[]>(`${this.url}/Policy/Latest`, { params: { count } });
  }

  // getInsurerPolicies(insurerId: number) {
  //   return this.http.get<Policy[]>(`${this.url}/Policy/Insurer/${insurerId}`);
  // }

  createPolicy(policy: CreatePolicy) {
    const formData = new FormData();
    policy.attachments.forEach((attachment) => {
      formData.append('attachments', attachment);
    });

    formData.append('jsonString', JSON.stringify(policy));
    return this.http.post<void>(`${this.url}/Policy`, formData);
  }

  editPolicy(policy: CreatePolicy, id: string) {
    const formData = new FormData();
    policy.attachments.forEach((attachment) => {
      formData.append('attachments', attachment);
    });

    formData.append('jsonString', JSON.stringify(policy));
    return this.http.put<void>(`${this.url}/Policy/${id}`, formData);
  }

  deletePolicy(policyId: string) {
    return this.http.delete<void>(`${this.url}/Policy/${policyId}`);
  }

  deletePolicyBatch(policyIds: string[]) {
    return this.http.delete<void>(`${this.url}/Policy/Batch`, { body: { ids: policyIds } });
  }

  paidPolicies(ids: string[]) {
    return this.http.patch<void>(`${this.url}/Policy/paid`, { ids });
  }
}
