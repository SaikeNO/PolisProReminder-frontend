import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, switchMapTo, tap } from 'rxjs';
import { BaseUser, User, UserInfo } from '../interfaces/auth';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  public user$ = new BehaviorSubject<User | null>(null);

  setUser(user: User) {
    this.user$.next(user);
  }

  updateUserInfo(userInfo: UserInfo) {
    return this.http
      .patch(`${environment.API_URL}/user/info`, userInfo)
      .pipe(switchMap(() => this.getUserInfo()));
  }

  getUserInfo() {
    return this.http.get<User>(`${environment.API_URL}/user/info`).pipe(
      tap((response) => {
        this.storageService.saveUser(response);
        this.setUser(response);
      }),
    );
  }

  getAgentInfo() {
    return this.http.get<BaseUser>(`${environment.API_URL}/user/agent/info`);
  }
}
