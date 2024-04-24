import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateInsurer, Insurer } from '../../shared/interfaces/insurer';

@Injectable({ providedIn: 'root' })
export class InsurersService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getInsurers() {
    return this.http.get<Insurer[]>(`${this.url}/Insurer`);
  }

  getPaginatedInsurers(pageIndex: number = 1, pageSize: number = 10) {
    return this.http.post<Insurer[]>(`${this.url}/Insurer/getPaginated`, {
      pageIndex,
      pageSize,
    });
  }

  createInsurer(insurer: CreateInsurer) {
    return this.http.post<void>(`${this.url}/Insurer`, insurer);
  }

  editInsurer(insurer: CreateInsurer, id: number) {
    return this.http.put<void>(`${this.url}/Insurer/${id}`, insurer);
  }
}
