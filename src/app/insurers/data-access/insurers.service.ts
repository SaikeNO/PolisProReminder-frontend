import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateInsurer, Insurer } from '../../shared/interfaces/insurer';
import { GetQuery } from '../../shared/interfaces/getQuery';
import { PageResult } from '../../shared/interfaces/pageResult';

@Injectable({ providedIn: 'root' })
export class InsurersService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getAllInsurers() {
    return this.http.get<Insurer[]>(`${this.url}/Insurer`);
  }

  getPaginatedInsurers(query: GetQuery) {
    return this.http.get<PageResult<Insurer>>(`${this.url}/Insurer/getPaginated`, {
      params: { ...query },
    });
  }

  createInsurer(insurer: CreateInsurer) {
    return this.http.post<void>(`${this.url}/Insurer`, insurer);
  }

  editInsurer(insurer: CreateInsurer, id: string) {
    return this.http.put<void>(`${this.url}/Insurer/${id}`, insurer);
  }

  deleteInsurer(id: string) {
    return this.http.delete<void>(`${this.url}/Insurer/${id}`);
  }
}
