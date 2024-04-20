import { createReducer, on } from '@ngrx/store';
import { InsurersState } from './insurers.models';
import * as InsurersActions from './insurers.actions';

export const initialState: InsurersState = {
  isLoading: false,
  insurers: [],
  error: null,
};

export const insurersReducer = createReducer(
  initialState,
  on(InsurersActions.getInsurers, (state) => ({ ...state, isLoading: true })),
  on(InsurersActions.getInsurersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    insurers: action.insurers,
  })),
  on(InsurersActions.getInsurersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
