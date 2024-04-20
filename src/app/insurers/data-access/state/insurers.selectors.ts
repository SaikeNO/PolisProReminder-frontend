import { createSelector } from '@ngrx/store';
import { AppState } from '../../../shared/reducers';

export const selectFeature = (state: AppState) => state.insurers;

export const isLoading = createSelector(selectFeature, (state) => state.isLoading);

export const getAllInsurers = createSelector(selectFeature, (state) => state.insurers);

export const getError = createSelector(selectFeature, (state) => state.error);

export const getColumns = createSelector(selectFeature, (state) => Object.keys(state.insurers));
