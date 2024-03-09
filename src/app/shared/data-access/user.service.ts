import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  public user$ = new BehaviorSubject<User | null>(null);

  setUser(user: User) {
    this.user$.next(user);
  }
}
