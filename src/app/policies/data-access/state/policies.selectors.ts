import { createSelector } from '@ngrx/store';
import { AppState } from '../../../reducers';

export const selectFeature = (state: AppState) => state.policies;

export const isLoading = createSelector(selectFeature, (state) => state.isLoading);

export const getAllPolicies = createSelector(selectFeature, (state) => state.policies);

export const getError = createSelector(selectFeature, (state) => state.error);
