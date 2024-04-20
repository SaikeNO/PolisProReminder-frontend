import { ActionReducerMap } from '@ngrx/store';
import { policiesReducer } from '../../policies/data-access/state/policies.reducer';
import { PoliciesState } from '../../policies/data-access/state/policies.models';
import { CompaniesState } from '../../insurance-company/data-access/state/companies.models';
import { companiesReducer } from '../../insurance-company/data-access/state/companies.reducer';
import { InsuranceTypesState } from '../../insurance-types/data-access/state/insurance-types.models';
import { insuranceTypesReducer } from '../../insurance-types/data-access/state/insurance-types.reducer';

export interface AppState {
  policies: PoliciesState;
  companies: CompaniesState;
  insuranceTypes: InsuranceTypesState;
}

export const reducers: ActionReducerMap<AppState> = {
  policies: policiesReducer,
  companies: companiesReducer,
  insuranceTypes: insuranceTypesReducer,
};
