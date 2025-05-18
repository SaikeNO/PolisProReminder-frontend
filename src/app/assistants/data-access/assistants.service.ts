import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/interfaces/auth';
import { CreateAssistant } from '../../shared/interfaces/assistant';

@Injectable({ providedIn: 'root' })
export class AssistantsService {
  private http = inject(HttpClient);
  private url = `${environment.API_URL}/user/assistant`;

  private assistantsSubject = new BehaviorSubject<User[]>([]);
  assistants$ = this.assistantsSubject.asObservable();

  createAssistant(assistant: CreateAssistant): Observable<string> {
    return this.http
      .post<string>(this.url, assistant)
      .pipe(tap(() => this.getAssistants().subscribe()));
  }

  getAssistants(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url)
      .pipe(tap((assistants) => this.assistantsSubject.next(assistants)));
  }

  lockoutAssistant(assistantId: string): Observable<void> {
    return this.http
      .patch<void>(`${this.url}/${assistantId}/lockout`, {})
      .pipe(tap(() => this.getAssistants().subscribe()));
  }

  deleteAssistant(assistantId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${assistantId}`)
      .pipe(tap(() => this.getAssistants().subscribe()));
  }
}
