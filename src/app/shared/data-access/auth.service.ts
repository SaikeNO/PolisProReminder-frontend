import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Credentials } from '../interfaces/credentials';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { loginResponse } from '../interfaces/loginResponse';
import { environment } from '../../../environments/environment';
import { refreshTokenResponse } from '../interfaces/refreshTokenResponse';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

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

  refreshToken() {
    return this.http
      .post<refreshTokenResponse>(`${environment.API_URL}/refreshtoken`, null)
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
