import { createReducer, on } from '@ngrx/store';
import { InsurersState } from './insurers.models';
import * as InsurersActions from './insurers.actions';

export const initialState: InsurersState = {
  isLoading: false,
  error: null,
  individualInsurers: [],
  businessInsurers: [],
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

  on(InsurersActions.deleteInsurer, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(InsurersActions.deleteInsurerSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(InsurersActions.deleteInsurerFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  //Individual
  on(InsurersActions.getPaginatedIndividualInsurers, (state, { query }) => ({
    ...state,
    query,
    isLoading: true,
  })),
  on(
    InsurersActions.getPaginatedIndividualInsurersSuccess,
    (state, { pageResult: { items, itemsFrom, itemsTo, totalItemsCount, totalPages } }) => ({
      ...state,
      itemsFrom,
      itemsTo,
      totalItemsCount,
      totalPages,
      isLoading: false,
      individualInsurers: items,
    }),
  ),
  on(InsurersActions.getPaginatedIndividualInsurersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InsurersActions.createIndividualInsurer, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(InsurersActions.createIndividualInsurerSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(InsurersActions.createIndividualInsurerFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InsurersActions.editIndividualInsurer, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(InsurersActions.editIndividualInsurerSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(InsurersActions.editIndividualInsurerFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  //Business
  on(InsurersActions.getPaginatedBusinessInsurers, (state, { query }) => ({
    ...state,
    query,
    isLoading: true,
  })),
  on(
    InsurersActions.getPaginatedBusinessInsurersSuccess,
    (state, { pageResult: { items, itemsFrom, itemsTo, totalItemsCount, totalPages } }) => ({
      ...state,
      itemsFrom,
      itemsTo,
      totalItemsCount,
      totalPages,
      isLoading: false,
      businessInsurers: items,
    }),
  ),
  on(InsurersActions.getPaginatedBusinessInsurersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InsurersActions.createBusinessInsurer, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(InsurersActions.createBusinessInsurerSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(InsurersActions.createBusinessInsurerFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InsurersActions.editBusinessInsurer, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(InsurersActions.editBusinessInsurerSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(InsurersActions.editBusinessInsurerFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
