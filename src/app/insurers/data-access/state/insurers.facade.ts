import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as InsurersActions from './insurers.actions';
import * as InsurersSelectors from './insurers.selectors';
import { AppState } from '../../../shared/reducers';
import { CreateBusinessInsurer, CreateIndividualInsurer } from '../../../shared/interfaces/insurer';
import { GetQuery } from '../../../shared/interfaces/getQuery';

@Injectable({ providedIn: 'root' })
export class InsurersFacade {
  private store: Store<AppState> = inject(Store);

  isLoading$ = this.store.pipe(select(InsurersSelectors.isLoading));
  error$ = this.store.pipe(select(InsurersSelectors.getError));
  query$ = this.store.pipe(select(InsurersSelectors.getQuery));
  individualInsurers$ = this.store.pipe(select(InsurersSelectors.getIndividualInsurers));
  businessInsurers$ = this.store.pipe(select(InsurersSelectors.getBusinessInsurers));
  insurersBasicInfo$ = this.store.pipe(select(InsurersSelectors.getInsurersBasicInfo));
  totalItemsCount$ = this.store.pipe(select(InsurersSelectors.getTotalItemsCount));
  totalPages$ = this.store.pipe(select(InsurersSelectors.getTotalPages));
  itemsFrom$ = this.store.pipe(select(InsurersSelectors.getItemsFrom));
  itemsTo$ = this.store.pipe(select(InsurersSelectors.getItemsTo));

  getAllInsurers(): void {
    this.store.dispatch(InsurersActions.getAllInsurers());
  }

  deleteInsurer(id: string): void {
    this.store.dispatch(InsurersActions.deleteInsurer({ id }));
  }

  //Individual
  getPaginatedIndividualInsurers(query: GetQuery): void {
    this.store.dispatch(InsurersActions.getPaginatedIndividualInsurers({ query }));
  }

  createIndividualInsurer(createInsurer: CreateIndividualInsurer): void {
    this.store.dispatch(InsurersActions.createIndividualInsurer({ createInsurer }));
  }

  editIndividualInsurer(createInsurer: CreateIndividualInsurer, id: string): void {
    this.store.dispatch(InsurersActions.editIndividualInsurer({ createInsurer, id }));
  }

  //Business
  getPaginatedBusinessInsurers(query: GetQuery): void {
    this.store.dispatch(InsurersActions.getPaginatedBusinessInsurers({ query }));
  }

  createBusinessInsurer(createInsurer: CreateBusinessInsurer): void {
    this.store.dispatch(InsurersActions.createBusinessInsurer({ createInsurer }));
  }

  editBusinessInsurer(createInsurer: CreateBusinessInsurer, id: string): void {
    this.store.dispatch(InsurersActions.editBusinessInsurer({ createInsurer, id }));
  }
}
