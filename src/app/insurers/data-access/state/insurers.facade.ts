import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as InsurersActions from './insurers.actions';
import * as InsurersSelectors from './insurers.selectors';
import { AppState } from '../../../shared/reducers';
import { CreateInsurer } from '../../../shared/interfaces/insurer';
import { GetQuery } from '../../../shared/interfaces/getQuery';

@Injectable({ providedIn: 'root' })
export class InsurersFacade {
  private store: Store<AppState> = inject(Store);

  isLoading$ = this.store.pipe(select(InsurersSelectors.isLoading));
  error$ = this.store.pipe(select(InsurersSelectors.getError));
  query$ = this.store.pipe(select(InsurersSelectors.getQuery));
  insurers$ = this.store.pipe(select(InsurersSelectors.getInsurers));
  totalItemsCount$ = this.store.pipe(select(InsurersSelectors.getTotalItemsCount));
  totalPages$ = this.store.pipe(select(InsurersSelectors.getTotalPages));
  itemsFrom$ = this.store.pipe(select(InsurersSelectors.getItemsFrom));
  itemsTo$ = this.store.pipe(select(InsurersSelectors.getItemsTo));

  getPaginatedInsurers(query: GetQuery): void {
    this.store.dispatch(InsurersActions.getPaginatedInsurers({ query }));
  }

  getAllInsurers(): void {
    this.store.dispatch(InsurersActions.getAllInsurers());
  }

  createInsurer(createInsurer: CreateInsurer): void {
    this.store.dispatch(InsurersActions.createInsurer({ createInsurer }));
  }

  editInsurer(createInsurer: CreateInsurer, id: string): void {
    this.store.dispatch(InsurersActions.editInsurer({ createInsurer, id }));
  }

  deleteInsurer(id: string): void {
    this.store.dispatch(InsurersActions.deleteInsurer({ id }));
  }
}
