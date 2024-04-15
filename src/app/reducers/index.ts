import { ActionReducerMap } from '@ngrx/store';
import { policiesReducer } from '../policies/data-access/state/policies.reducer';
import { PoliciesState } from '../policies/data-access/state/policies.models';

export interface AppState {
  policies: PoliciesState;
}

export const reducers: ActionReducerMap<AppState> = {
  policies: policiesReducer,
};
