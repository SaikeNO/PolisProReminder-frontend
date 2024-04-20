import { ActionReducerMap } from '@ngrx/store';
import { policiesReducer } from '../../policies/data-access/state/policies.reducer';
import { PoliciesState } from '../../policies/data-access/state/policies.models';
import { CompaniesState } from '../../insurance-company/data-access/state/companies.models';
import { companiesReducer } from '../../insurance-company/data-access/state/companies.reducer';
import { InsuranceTypesState } from '../../insurance-types/data-access/state/insurance-types.models';
import { insuranceTypesReducer } from '../../insurance-types/data-access/state/insurance-types.reducer';
import { InsurersState } from '../../insurers/data-access/state/insurers.models';
import { insurersReducer } from '../../insurers/data-access/state/insurers.reducer';

export interface AppState {
  policies: PoliciesState;
  insuranceTypes: InsuranceTypesState;
  companies: CompaniesState;
  insurers: InsurersState;
}

export const reducers: ActionReducerMap<AppState> = {
  policies: policiesReducer,
  insurers: insurersReducer,
  companies: companiesReducer,
  insuranceTypes: insuranceTypesReducer,
};
