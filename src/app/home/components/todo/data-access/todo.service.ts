import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTask, Task } from '../../../../shared/interfaces/task';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private url = `${environment.API_URL}/todotask`;

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  addTask(task: CreateTask): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.url, task);
  }

  updateTaskOrder(tasks: Task[]): Observable<Task> {
    return this.http.post<Task>(`${this.url}/Order`, { todoTasks: tasks });
  }
}
