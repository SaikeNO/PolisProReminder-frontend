import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as PoliciesActions from './policies.actions';
import * as PoliciesSelectors from './policies.selectors';
import { AppState } from '../../../shared/reducers';
import { GetQuery } from '../../../shared/interfaces/getQuery';

@Injectable({ providedIn: 'root' })
export class PoliciesFacade {
  private store: Store<AppState> = inject(Store);

  isLoading$ = this.store.pipe(select(PoliciesSelectors.isLoading));
  error$ = this.store.pipe(select(PoliciesSelectors.getError));
  policies$ = this.store.pipe(select(PoliciesSelectors.getPolicies));
  totalItemsCount$ = this.store.pipe(select(PoliciesSelectors.getTotalItemsCount));
  totalPages$ = this.store.pipe(select(PoliciesSelectors.getTotalPages));
  itemsFrom$ = this.store.pipe(select(PoliciesSelectors.getItemsFrom));
  itemsTo$ = this.store.pipe(select(PoliciesSelectors.getItemsTo));

  getPolicies(query: GetQuery): void {
    this.store.dispatch(PoliciesActions.getPolicies({ query }));
  }
}
