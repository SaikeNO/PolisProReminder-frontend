import { createSelector } from '@ngrx/store';
import { AppState } from '../../../shared/reducers';

export const selectFeature = (state: AppState) => state.policies;

export const isLoading = createSelector(selectFeature, (state) => state.isLoading);

export const getError = createSelector(selectFeature, (state) => state.error);

export const getQuery = createSelector(selectFeature, (state) => state.query);

export const getPolicies = createSelector(selectFeature, (state) => state.policies);

export const getTotalPages = createSelector(selectFeature, (state) => state.totalPages);

export const getItemsFrom = createSelector(selectFeature, (state) => state.itemsFrom);

export const getItemsTo = createSelector(selectFeature, (state) => state.itemsTo);

export const getTotalItemsCount = createSelector(selectFeature, (state) => state.totalItemsCount);
