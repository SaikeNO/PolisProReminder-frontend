import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Credentials } from '../interfaces/credentials';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: Credentials) {
    return this.http
      .post<any>('https://localhost:7171/api/account/login', credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.token);
        })
      );
  }
}
