import { createReducer, on } from '@ngrx/store';
import { CompaniesState } from './companies.models';
import * as CompaniesActions from './companies.actions';

export const initialState: CompaniesState = {
  isLoading: false,
  companies: [],
  error: null,
};

export const companiesReducer = createReducer(
  initialState,
  on(CompaniesActions.getCompanies, (state) => ({ ...state, isLoading: true })),
  on(CompaniesActions.getCompaniesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    companies: action.companies,
  })),
  on(CompaniesActions.getCompaniesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
