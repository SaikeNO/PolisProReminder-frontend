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

  on(CompaniesActions.createCompany, (state) => ({ ...state, isLoading: true })),
  on(CompaniesActions.createCompanySuccess, (state) => ({ ...state, isLoading: false })),
  on(CompaniesActions.createCompanyFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(CompaniesActions.deleteCompany, (state) => ({ ...state, isLoading: true })),
  on(CompaniesActions.deleteCompanySuccess, (state) => ({ ...state, isLoading: false })),
  on(CompaniesActions.deleteCompanyFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(CompaniesActions.editCompany, (state) => ({ ...state, isLoading: true })),
  on(CompaniesActions.editCompanySuccess, (state) => ({ ...state, isLoading: false })),
  on(CompaniesActions.editCompanyFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
