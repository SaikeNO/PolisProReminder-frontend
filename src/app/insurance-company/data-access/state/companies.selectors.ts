import { createSelector } from '@ngrx/store';
import { AppState } from '../../../shared/reducers';

export const selectFeature = (state: AppState) => state.companies;

export const isLoading = createSelector(selectFeature, (state) => state.isLoading);

export const getCompanies = createSelector(selectFeature, (state) => state.companies);

export const getError = createSelector(selectFeature, (state) => state.error);
