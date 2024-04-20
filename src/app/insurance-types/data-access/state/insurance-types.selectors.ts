import { createSelector } from '@ngrx/store';
import { AppState } from '../../../shared/reducers';

export const selectFeature = (state: AppState) => state.insuranceTypes;

export const isLoading = createSelector(selectFeature, (state) => state.isLoading);

export const getInsuranceTypes = createSelector(selectFeature, (state) => state.insuranceTypes);

export const getError = createSelector(selectFeature, (state) => state.error);
