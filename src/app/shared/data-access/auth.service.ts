import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Credentials } from '../interfaces/credentials';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { loginResponse } from '../interfaces/loginResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  public user$ = new BehaviorSubject<User | null>(null);

  login(credentials: Credentials) {
    return this.http
      .post<loginResponse>(
        'https://localhost:7171/api/account/login',
        credentials
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.user$.next(response.user);
        })
      );
  }

  setUserData() {
    const user = localStorage.getItem('user');

    if (user) {
      this.user$.next(JSON.parse(user));
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }
}
