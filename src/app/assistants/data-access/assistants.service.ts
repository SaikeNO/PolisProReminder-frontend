import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Assistant, CreateAssistant } from '../../shared/interfaces/assistant';

@Injectable({ providedIn: 'root' })
export class AssistantsService {
  private http = inject(HttpClient);
  private url = `${environment.API_URL}/user/assistant`;

  private assistantsSubject = new BehaviorSubject<Assistant[]>([]);
  assistants$ = this.assistantsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  createAssistant(assistant: CreateAssistant): Observable<string> {
    this.loadingSubject.next(true);
    return this.http.post<string>(this.url, assistant).pipe(
      tap(() => this.loadAssistants()),
      tap({ finalize: () => this.loadingSubject.next(false) }),
    );
  }

  getAssistants(): Observable<Assistant[]> {
    this.loadingSubject.next(true);
    return this.http.get<Assistant[]>(this.url).pipe(
      tap((assistants) => this.assistantsSubject.next(assistants)),
      tap({ finalize: () => this.loadingSubject.next(false) }),
    );
  }

  loadAssistants(): void {
    this.getAssistants().subscribe();
  }
}
