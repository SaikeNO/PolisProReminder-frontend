import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { Credentials, LoginResponse, ChangePassword, User } from '../interfaces/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private userService = inject(UserService);

  login(credentials: Credentials) {
    return this.http.post<LoginResponse>(`${environment.API_URL}/identity/login`, credentials).pipe(
      tap((response) => {
        this.storageService.saveAccessToken(response.accessToken);
        this.storageService.saveRefreshToken(response.refreshToken);
      }),
    );
  }

  getUserInfo() {
    return this.http.get<User>(`${environment.API_URL}/user/info`).pipe(
      tap((response) => {
        this.storageService.saveUser(response);
        this.userService.setUser(response);
      }),
    );
  }

  changePassword(changePassword: ChangePassword) {
    return this.http.post<void>(`${environment.API_URL}/user/changePassword`, changePassword);
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

  logout() {
    this.storageService.clean();
  }
}
