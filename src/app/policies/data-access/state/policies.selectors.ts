import { createSelector } from '@ngrx/store';
import { AppState } from '../../../reducers';

export const selectFeature = (state: AppState) => state.policies;

export const isLoading = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const policiesSelector = createSelector(
  selectFeature,
  (state) => state.policies
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);
