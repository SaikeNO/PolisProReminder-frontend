import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Insurer } from '../../shared/interfaces/insurer';

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
}
