import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateInsuranceType, InsuranceType } from '../../shared/interfaces/insuranceType';

@Injectable({ providedIn: 'root' })
export class InsuranceTypesService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getInsuranceTypes() {
    return this.http.get<InsuranceType[]>(`${this.url}/InsuranceType`);
  }

  createInsuranceType(type: CreateInsuranceType) {
    return this.http.post<void>(`${this.url}/InsuranceType`, type);
  }

  editInsuranceType(type: CreateInsuranceType, id: number) {
    return this.http.put<void>(`${this.url}/InsuranceType/${id}`, type);
  }

  deleteInsuranceType(id: number) {
    return this.http.delete<void>(`${this.url}/InsuranceType/${id}`);
  }
}
