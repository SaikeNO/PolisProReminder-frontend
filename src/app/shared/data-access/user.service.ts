import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/auth';

@Injectable({ providedIn: 'root' })
export class UserService {
  public user$ = new BehaviorSubject<User | null>(null);

  setUser(user: User) {
    this.user$.next(user);
  }
}
