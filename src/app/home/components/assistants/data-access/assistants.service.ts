import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Assistant } from '../../../../shared/interfaces/assistant';

@Injectable({ providedIn: 'root' })
export class AssistantsService {
  private http = inject(HttpClient);
  private url = `${environment.API_URL}/user/assistant`;

  getAssistants(): Observable<Assistant[]> {
    return this.http.get<Assistant[]>(this.url);
  }
}
