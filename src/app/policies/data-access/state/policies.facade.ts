import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as PoliciesActions from './policies.actions';
import * as PoliciesSelectors from './policies.selectors';
import { AppState } from '../../../reducers';

@Injectable({ providedIn: 'root' })
export class PoliciesFacade {
  private store: Store<AppState> = inject(Store);

  policies$ = this.store.pipe(select(PoliciesSelectors.getAllPolicies));
  isLoading$ = this.store.pipe(select(PoliciesSelectors.isLoading));
  error$ = this.store.pipe(select(PoliciesSelectors.getError));

  getPolicies(): void {
    this.store.dispatch(PoliciesActions.getPolicies());
  }

  getPaginatedPolicies(pageIndex: number, pageSize: number): void {
    this.store.dispatch(PoliciesActions.getPaginatedPolicies({ params: { pageSize, pageIndex } }));
  }
}
