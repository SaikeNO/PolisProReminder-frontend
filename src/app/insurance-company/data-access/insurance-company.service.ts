import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateInsuranceCompany, InsuranceCompany } from '../../shared/interfaces/insuranceCompany';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InsuranceCompanyService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getCompanies() {
    return this.http.get<InsuranceCompany[]>(`${this.url}/InsuranceCompany`);
  }

  createCompany(company: CreateInsuranceCompany) {
    return this.http.post<void>(`${this.url}/InsuranceCompany`, { company });
  }
}
