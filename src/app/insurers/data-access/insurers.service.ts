import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  BusinessInsurer,
  CreateBusinessInsurer,
  CreateIndividualInsurer,
  IndividualInsurer,
  InsurerBasicInfo,
} from '../../shared/interfaces/insurer';
import { GetQuery } from '../../shared/interfaces/getQuery';
import { PageResult } from '../../shared/interfaces/pageResult';

@Injectable({ providedIn: 'root' })
export class InsurersService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getAllInsurers() {
    return this.http.get<InsurerBasicInfo[]>(`${this.url}/Insurer`);
  }

  deleteInsurer(id: string) {
    return this.http.delete<void>(`${this.url}/Insurer/${id}`);
  }

  //Individual
  getPaginatedIndividualInsurers(query: GetQuery) {
    return this.http.get<PageResult<IndividualInsurer>>(
      `${this.url}/Insurer/Individual/Paginated`,
      {
        params: { ...query },
      },
    );
  }

  createIndividualInsurer(insurer: CreateIndividualInsurer) {
    return this.http.post<void>(`${this.url}/Insurer/Individual`, insurer);
  }

  editIndividualInsurer(insurer: CreateIndividualInsurer, id: string) {
    return this.http.put<void>(`${this.url}/Insurer/Individual/${id}`, insurer);
  }

  //Business
  getPaginatedBusinessInsurers(query: GetQuery) {
    return this.http.get<PageResult<BusinessInsurer>>(`${this.url}/Insurer/Business/Paginated`, {
      params: { ...query },
    });
  }

  createBusinessInsurer(insurer: CreateBusinessInsurer) {
    return this.http.post<void>(`${this.url}/Insurer/Business`, insurer);
  }

  editBusinessInsurer(insurer: CreateBusinessInsurer, id: string) {
    return this.http.put<void>(`${this.url}/Insurer/Business/${id}`, insurer);
  }
}
