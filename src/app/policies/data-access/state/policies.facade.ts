import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as PoliciesActions from './policies.actions';
import { policiesSelector } from './policies.selectors';
import { AppState } from '../../../reducers';

@Injectable({ providedIn: 'root' })
export class PoliciesFacade {
  private store: Store<AppState> = inject(Store);

  policies$ = this.store.pipe(select(policiesSelector));

  getPolicies(startIndex: number, pageSize: number): void {
    this.store.dispatch(
      PoliciesActions.getPolicies({ params: { pageSize, startIndex } })
    );
  }
}
