import { createAction, props } from '@ngrx/store';
import { GetPaginatedInsurers } from './insurers.models';
import { Insurer } from '../../../shared/interfaces/insurer';

export const getInsurers = createAction('[Insurers Page] Get All Insurers');

export const getInsurersSuccess = createAction(
  '[Insurers Page] Get All Insurers Success',
  props<{ insurers: Insurer[] }>(),
);

export const getInsurersFailure = createAction(
  '[Insurers Page] Get All Insurers Failure',
  props<{ error: string }>(),
);

export const getPaginatedInsurers = createAction(
  '[Insurers Page] Get Paginated Insurers',
  props<{ params: GetPaginatedInsurers }>(),
);

export const getPaginatedInsurersSuccess = createAction(
  '[Insurers Page] Get Paginated Insurers Success',
  props<{ insurers: Insurer[] }>(),
);

export const getPaginatedInsurersFailure = createAction(
  '[Insurers Page] Get Paginated Insurers Failure',
  props<{ error: string }>(),
);
