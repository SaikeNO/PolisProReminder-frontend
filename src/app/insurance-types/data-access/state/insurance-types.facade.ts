import { Injectable, inject } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import * as InsuranceTypesActions from './insurance-types.actions';
import * as InsuranceTypesSelectors from './insurance-types.selectors';
import { AppState } from '../../../shared/reducers';
import { CreateInsuranceType } from '../../../shared/interfaces/insuranceType';

@Injectable({ providedIn: 'root' })
export class InsuranceTypesFacade {
  private store: Store<AppState> = inject(Store);

  insuranceTypes$ = this.store.pipe(select(InsuranceTypesSelectors.getInsuranceTypes));
  isLoading$ = this.store.pipe(select(InsuranceTypesSelectors.isLoading));
  error$ = this.store.pipe(select(InsuranceTypesSelectors.getError));

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  getInsuranceTypes(): void {
    this.dispatch(InsuranceTypesActions.getInsuranceTypes());
  }

  createInsuranceType(insuranceType: CreateInsuranceType): void {
    this.dispatch(InsuranceTypesActions.createInsuranceType({ insuranceType }));
  }

  editInsuranceType(insuranceType: CreateInsuranceType, id: string): void {
    this.dispatch(InsuranceTypesActions.editInsuranceType({ insuranceType, id }));
  }

  deleteInsuranceType(id: string): void {
    this.dispatch(InsuranceTypesActions.deleteInsuranceType({ id }));
  }
}
