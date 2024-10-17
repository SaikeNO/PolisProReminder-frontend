import { createReducer, on } from '@ngrx/store';
import { InsurersState } from './insurers.models';
import * as InsurersActions from './insurers.actions';

export const initialState: InsurersState = {
  isLoading: false,
  error: null,
  insurers: [],
  insurersBasicInfo: [],
  query: {
    searchPhrase: '',
    pageIndex: 0,
    pageSize: 10,
    sortBy: '',
    sortDirection: 'none',
  },
  itemsFrom: 0,
  itemsTo: 0,
  totalItemsCount: 0,
  totalPages: 0,
};

export const insurersReducer = createReducer(
  initialState,
  on(InsurersActions.getAllInsurers, (state) => ({ ...state, isLoading: true, error: null })),
  on(InsurersActions.getAllInsurersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    insurersBasicInfo: action.insurers,
  })),
  on(InsurersActions.getAllInsurersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InsurersActions.getPaginatedInsurers, (state, { query }) => ({
    ...state,
    query,
    isLoading: true,
  })),
  on(
    InsurersActions.getPaginatedInsurersSuccess,
    (state, { pageResult: { items, itemsFrom, itemsTo, totalItemsCount, totalPages } }) => ({
      ...state,
      itemsFrom,
      itemsTo,
      totalItemsCount,
      totalPages,
      isLoading: false,
      insurers: items,
    }),
  ),
  on(InsurersActions.getPaginatedInsurersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InsurersActions.createInsurer, (state) => ({ ...state, isLoading: true, error: null })),
  on(InsurersActions.createInsurerSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(InsurersActions.createInsurerFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InsurersActions.editInsurer, (state) => ({ ...state, isLoading: true, error: null })),
  on(InsurersActions.editInsurerSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(InsurersActions.editInsurerFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InsurersActions.deleteInsurer, (state) => ({ ...state, isLoading: true, error: null })),
  on(InsurersActions.deleteInsurerSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(InsurersActions.deleteInsurerFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
