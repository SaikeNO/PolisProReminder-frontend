import { ActionReducerMap } from '@ngrx/store';
import { policiesReducer } from '../../policies/data-access/state/policies.reducer';
import { PoliciesState } from '../../policies/data-access/state/policies.models';
import { CompaniesState } from '../../insurance-company/data-access/state/companies.models';
import { companiesReducer } from '../../insurance-company/data-access/state/companies.reducer';

export interface AppState {
  policies: PoliciesState;
  companies: CompaniesState;
}

export const reducers: ActionReducerMap<AppState> = {
  policies: policiesReducer,
  companies: companiesReducer,
};
