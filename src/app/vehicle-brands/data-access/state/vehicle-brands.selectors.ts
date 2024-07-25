import { createSelector } from '@ngrx/store';
import { AppState } from '../../../shared/reducers';

export const selectFeature = (state: AppState) => state.vehicleBrands;

export const isLoading = createSelector(selectFeature, (state) => state.isLoading);

export const getError = createSelector(selectFeature, (state) => state.error);

export const getVehicleBrands = createSelector(selectFeature, (state) => state.vehicleBrands);
