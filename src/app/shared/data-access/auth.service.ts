import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Credentials } from '../interfaces/credentials';
import { tap } from 'rxjs';
import { loginResponse } from '../interfaces/loginResponse';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { Token } from '../interfaces/Token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private userService = inject(UserService);

  login(credentials: Credentials) {
    return this.http
      .post<loginResponse>(`${environment.API_URL}/account/login`, credentials)
      .pipe(
        tap((response) => {
          this.storageService.saveAccessToken(response.token);
          this.storageService.saveUser(response.user);
          this.userService.setUser(response.user);
        })
      );
  }

  isAuthenticated(): boolean {
    return !!this.storageService.getAccessToken();
  }

  refreshToken(token: string) {
    return this.http
      .post<Token>(`${environment.API_URL}/account/refresh-token`, { token })
      .pipe(
        tap((response) => {
          this.storageService.saveAccessToken(response.token);
        })
      );
  }

  logout() {
    this.storageService.clean();
  }
}
