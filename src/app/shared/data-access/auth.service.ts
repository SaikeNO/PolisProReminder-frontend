import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { Credentials, LoginResponse, ChangePassword, ChangeEmail } from '../interfaces/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  login(credentials: Credentials) {
    return this.http.post<LoginResponse>(`${environment.API_URL}/identity/login`, credentials).pipe(
      tap((response) => {
        this.storageService.saveAccessToken(response.accessToken);
        this.storageService.saveRefreshToken(response.refreshToken);
      }),
    );
  }

  changePassword(changePassword: ChangePassword) {
    return this.http.post<void>(`${environment.API_URL}/identity/manage/info`, changePassword);
  }

  changeEmail(changeEmail: ChangeEmail) {
    return this.http.post<void>(`${environment.API_URL}/identity/manage/info`, changeEmail);
  }

  isAuthenticated(): boolean {
    return !!this.storageService.getAccessToken();
  }

  refreshToken(refreshToken: string) {
    return this.http
      .post<LoginResponse>(`${environment.API_URL}/identity/refresh`, { refreshToken })
      .pipe(
        tap((response) => {
          this.storageService.saveAccessToken(response.accessToken);
        }),
      );
  }

  confirmEmail(userId: string, code: string) {
    return this.http.get<string>(`${environment.API_URL}/identity/confirmEmail`, {
      params: { userId, code },
      responseType: 'text' as 'json',
    });
  }

  resetPassword(email: string, resetCode: string, newPassword: string) {
    return this.http.post<void>(`${environment.API_URL}/identity/resetPassword`, {
      email,
      resetCode,
      newPassword,
    });
  }

  logout() {
    this.storageService.clean();
  }
}
