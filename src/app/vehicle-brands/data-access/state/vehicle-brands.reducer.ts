import { createReducer, on } from '@ngrx/store';
import * as VehicleBrandsActions from './vehicle-brands.actions';
import { VehicleBrandsState } from './vehicle-brands.models';

export const initialState: VehicleBrandsState = {
  isLoading: false,
  error: null,
  vehicleBrands: [],
};

export const vehicleBrandsReducer = createReducer(
  initialState,
  on(VehicleBrandsActions.getVehicleBrands, (state) => ({ ...state, isLoading: true })),
  on(VehicleBrandsActions.getVehicleBrandsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    vehicleBrands: action.vehicleBrands,
  })),
  on(VehicleBrandsActions.getVehicleBrandsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
