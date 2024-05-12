import { createReducer, on } from '@ngrx/store';
import { PoliciesState } from './policies.models';
import * as PoliciesActions from './policies.actions';

export const initialState: PoliciesState = {
  isLoading: false,
  error: null,
  policies: [],
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

export const policiesReducer = createReducer(
  initialState,
  on(PoliciesActions.getPolicies, (state, { query }) => ({ ...state, query, isLoading: true })),
  on(
    PoliciesActions.getPoliciesSuccess,
    (state, { pageResult: { items, itemsFrom, itemsTo, totalItemsCount, totalPages } }) => ({
      ...state,
      items,
      itemsFrom,
      itemsTo,
      totalItemsCount,
      totalPages,
      isLoading: false,
      policies: items,
    }),
  ),
  on(PoliciesActions.getPoliciesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(PoliciesActions.createPolicy, (state) => ({ ...state, isLoading: true, error: null })),
  on(PoliciesActions.createPolicySuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(PoliciesActions.createPolicyFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(PoliciesActions.editPolicy, (state) => ({ ...state, isLoading: true, error: null })),
  on(PoliciesActions.editPolicySuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(PoliciesActions.editPolicyFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(PoliciesActions.deletePolicy, (state) => ({ ...state, isLoading: true, error: null })),
  on(PoliciesActions.deletePolicySuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(PoliciesActions.deletePolicyFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
