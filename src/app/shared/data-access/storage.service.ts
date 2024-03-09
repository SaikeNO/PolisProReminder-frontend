import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

const USER_KEY = 'auth_user';
const ACCESS_TOKEN_KEY = 'access_token';

@Injectable({ providedIn: 'root' })
export class StorageService {
  clean(): void {
    window.localStorage.clear();
  }

  public saveUser(user: User): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User | null {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public saveAccessToken(token: string) {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token));
  }

  public getAccessToken(): string | null {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
  }
}
