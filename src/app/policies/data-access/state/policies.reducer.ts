import { createReducer, on } from '@ngrx/store';
import { PoliciesState } from './policies.models';
import * as PoliciesActions from './policies.actions';

export const initialState: PoliciesState = {
  isLoading: false,
  policies: [],
  error: null,
};

export const policiesReducer = createReducer(
  initialState,
  on(PoliciesActions.getPolicies, (state) => ({ ...state, isLoading: true })),
  on(PoliciesActions.getPoliciesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    policies: action.policies,
  })),
  on(PoliciesActions.getPoliciesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
