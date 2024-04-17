import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingBarService {
  public isLoading$ = new BehaviorSubject<boolean>(false);

  public setIsLoading(isLoading: boolean) {
    this.isLoading$.next(isLoading);
  }
}
