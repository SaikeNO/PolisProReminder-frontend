import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as PoliciesActions from './policies.actions';
import * as PoliciesSelectors from './policies.selectors';
import { AppState } from '../../../shared/reducers';
import { GetQuery } from '../../../shared/interfaces/getQuery';
import { CreatePolicy } from '../../../shared/interfaces/policy';

@Injectable({ providedIn: 'root' })
export class PoliciesFacade {
  private store: Store<AppState> = inject(Store);

  isLoading$ = this.store.pipe(select(PoliciesSelectors.isLoading));
  error$ = this.store.pipe(select(PoliciesSelectors.getError));
  query$ = this.store.pipe(select(PoliciesSelectors.getQuery));
  policies$ = this.store.pipe(select(PoliciesSelectors.getPolicies));
  latestPolicies$ = this.store.pipe(select(PoliciesSelectors.getLatestPolicies));
  totalItemsCount$ = this.store.pipe(select(PoliciesSelectors.getTotalItemsCount));
  totalPages$ = this.store.pipe(select(PoliciesSelectors.getTotalPages));
  itemsFrom$ = this.store.pipe(select(PoliciesSelectors.getItemsFrom));
  itemsTo$ = this.store.pipe(select(PoliciesSelectors.getItemsTo));

  getPolicies(query: GetQuery): void {
    this.store.dispatch(PoliciesActions.getPolicies({ query }));
  }

  getLatestPolicies(count: number): void {
    this.store.dispatch(PoliciesActions.getLatestPolicies({ count }));
  }

  createPolicy(createPolicy: CreatePolicy): void {
    this.store.dispatch(PoliciesActions.createPolicy({ createPolicy }));
  }

  editPolicy(createPolicy: CreatePolicy, id: string): void {
    this.store.dispatch(PoliciesActions.editPolicy({ createPolicy, id }));
  }

  deletePolicy(policyId: string): void {
    this.store.dispatch(PoliciesActions.deletePolicy({ policyId }));
  }
}
