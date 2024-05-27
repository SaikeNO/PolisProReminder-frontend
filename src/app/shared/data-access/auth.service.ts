import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { Credentials, LoginResponse, ResetPassword, Token } from '../interfaces/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private userService = inject(UserService);

  login(credentials: Credentials) {
    return this.http.post<LoginResponse>(`${environment.API_URL}/account/login`, credentials).pipe(
      tap((response) => {
        this.storageService.saveAccessToken(response.token);
        this.storageService.saveUser(response.user);
        this.userService.setUser(response.user);
      }),
    );
  }

  resetPassword(resetPassword: ResetPassword) {
    return this.http.post<void>(`${environment.API_URL}/account/reset-password`, resetPassword);
  }

  isAuthenticated(): boolean {
    return !!this.storageService.getAccessToken();
  }

  refreshToken(token: string) {
    return this.http.post<Token>(`${environment.API_URL}/account/refresh-token`, { token }).pipe(
      tap((response) => {
        this.storageService.saveAccessToken(response.token);
      }),
    );
  }

  logout() {
    this.storageService.clean();
  }
}
