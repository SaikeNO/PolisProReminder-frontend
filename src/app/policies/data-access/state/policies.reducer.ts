import { createReducer, on } from '@ngrx/store';
import { PoliciesState } from './policies.models';
import * as PoliciesActions from './policies.actions';

export const initialState: PoliciesState = {
  isLoading: false,
  error: null,
  policies: [],
  itemsFrom: 0,
  itemsTo: 0,
  totalItemsCount: 0,
  totalPages: 0,
};

export const policiesReducer = createReducer(
  initialState,
  on(PoliciesActions.getPolicies, (state) => ({ ...state, isLoading: true })),
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
);
