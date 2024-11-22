import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTask, Task } from '../../../../shared/interfaces/task';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  addTask(task: CreateTask): Observable<Task> {
    return this.http.post<Task>(this.url, { task });
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.url}/${task.id}`, task);
  }

  updateTaskOrder(tasks: Task[]): Observable<void> {
    return this.http.put<void>(`${this.url}/order`, tasks);
  }
}
