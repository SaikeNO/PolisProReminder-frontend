import { createAction, props } from '@ngrx/store';
import { VehicleBrand } from '../../../shared/interfaces/vehicleBrand';

export const getVehicleBrands = createAction('[Vehicle Brands Page] Get Vehicle Brands');

export const getVehicleBrandsSuccess = createAction(
  '[Vehicle Brands Page] Get Vehicle Brands Success',
  props<{ vehicleBrands: VehicleBrand[] }>(),
);

export const getVehicleBrandsFailure = createAction(
  '[Vehicle Brands Page] Get Vehicle Brands Failure',
  props<{ error: string }>(),
);
