import { createReducer, on } from '@ngrx/store';
import { InsuranceTypesState } from './insurance-types.models';
import * as InsuranceTypesActions from './insurance-types.actions';

export const initialState: InsuranceTypesState = {
  isLoading: false,
  insuranceTypes: [],
  error: null,
};

export const insuranceTypesReducer = createReducer(
  initialState,
  on(InsuranceTypesActions.getInsuranceTypes, (state) => ({ ...state, isLoading: true })),
  on(InsuranceTypesActions.getInsuranceTypesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    insuranceTypes: action.insuranceTypes,
  })),
  on(InsuranceTypesActions.getInsuranceTypesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InsuranceTypesActions.createInsuranceType, (state) => ({ ...state, isLoading: true })),
  on(InsuranceTypesActions.createInsuranceTypeSuccess, (state) => ({ ...state, isLoading: false })),
  on(InsuranceTypesActions.createInsuranceTypeFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InsuranceTypesActions.deleteInsuranceType, (state) => ({ ...state, isLoading: true })),
  on(InsuranceTypesActions.deleteInsuranceTypeSuccess, (state) => ({ ...state, isLoading: false })),
  on(InsuranceTypesActions.deleteInsuranceTypeFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InsuranceTypesActions.editInsuranceType, (state) => ({ ...state, isLoading: true })),
  on(InsuranceTypesActions.editInsuranceTypeSuccess, (state) => ({ ...state, isLoading: false })),
  on(InsuranceTypesActions.editInsuranceTypeFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
