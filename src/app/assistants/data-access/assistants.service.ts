import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
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
      .pipe(switchMap((result) => this.getAssistants().pipe(switchMap(() => of(result)))));
  }

  getAssistants(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url)
      .pipe(tap((assistants) => this.assistantsSubject.next(assistants)));
  }

  unlockAssistant(assistantId: string): Observable<void> {
    return this.http
      .patch<void>(`${this.url}/${assistantId}/unlock`, {})
      .pipe(switchMap((result) => this.getAssistants().pipe(switchMap(() => of(result)))));
  }

  lockoutAssistant(assistantId: string): Observable<void> {
    return this.http
      .patch<void>(`${this.url}/${assistantId}/lockout`, {})
      .pipe(switchMap((result) => this.getAssistants().pipe(switchMap(() => of(result)))));
  }

  deleteAssistant(assistantId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${assistantId}`)
      .pipe(switchMap((result) => this.getAssistants().pipe(switchMap(() => of(result)))));
  }
}
