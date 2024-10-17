import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateInsurer, Insurer, InsurerBasicInfo } from '../../shared/interfaces/insurer';
import { GetQuery } from '../../shared/interfaces/getQuery';
import { PageResult } from '../../shared/interfaces/pageResult';

@Injectable({ providedIn: 'root' })
export class InsurersService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getAllInsurers() {
    return this.http.get<InsurerBasicInfo[]>(`${this.url}/Insurer`);
  }

  getPaginatedInsurers(query: GetQuery) {
    return this.http.get<PageResult<Insurer>>(`${this.url}/Insurer/Individual/Paginated`, {
      params: { ...query },
    });
  }

  createInsurer(insurer: CreateInsurer) {
    return this.http.post<void>(`${this.url}/Insurer/Individual`, insurer);
  }

  editInsurer(insurer: CreateInsurer, id: string) {
    return this.http.put<void>(`${this.url}/Insurer/Individual/${id}`, insurer);
  }

  deleteInsurer(id: string) {
    return this.http.delete<void>(`${this.url}/Insurer/${id}`);
  }
}
