import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as InsurersActions from './insurers.actions';
import * as InsurersSelectors from './insurers.selectors';
import { AppState } from '../../../shared/reducers';
import { CreateInsurer } from '../../../shared/interfaces/insurer';

@Injectable({ providedIn: 'root' })
export class InsurersFacade {
  private store: Store<AppState> = inject(Store);

  insurers$ = this.store.pipe(select(InsurersSelectors.getAllInsurers));
  isLoading$ = this.store.pipe(select(InsurersSelectors.isLoading));
  error$ = this.store.pipe(select(InsurersSelectors.getError));
  columns$ = this.store.pipe(select(InsurersSelectors.getColumns));

  getInsurers(): void {
    this.store.dispatch(InsurersActions.getInsurers());
  }

  getPaginatedInsurers(pageIndex: number, pageSize: number): void {
    this.store.dispatch(InsurersActions.getPaginatedInsurers({ params: { pageSize, pageIndex } }));
  }

  createInsurer(createInsurer: CreateInsurer): void {
    this.store.dispatch(InsurersActions.createInsurer({ createInsurer }));
  }

  editInsurer(createInsurer: CreateInsurer, id: number): void {
    this.store.dispatch(InsurersActions.editInsurer({ createInsurer, id }));
  }

  deleteInsurer(id: number): void {
    this.store.dispatch(InsurersActions.deleteInsurer({ id }));
  }
}
