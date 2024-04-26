import { createAction, props } from '@ngrx/store';
import { GetPaginatedInsurers } from './insurers.models';
import { CreateInsurer, Insurer } from '../../../shared/interfaces/insurer';
import { ActionResults } from '../../../shared/interfaces/actionResults';

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

export const createInsurer = createAction(
  '[Insurers Page] Create Insurer',
  props<{ createInsurer: CreateInsurer }>(),
);

export const createInsurerSuccess = createAction(
  '[Insurers Page] Create Insurer Success',
  props<{ result: ActionResults }>(),
);

export const createInsurerFailure = createAction(
  '[Insurers Page] Create Insurer Failure',
  props<{ error: string }>(),
);

export const editInsurer = createAction(
  '[Insurer Page] Edit Insurer ',
  props<{ createInsurer: CreateInsurer; id: number }>(),
);

export const editInsurerSuccess = createAction(
  '[Insurer Page] Edit Insurer Success',
  props<{ result: ActionResults }>(),
);

export const editInsurerFailure = createAction(
  '[Insurer Page] Edit Insurer Failure',
  props<{ error: string }>(),
);

export const deleteInsurer = createAction(
  '[Insurer Page] Delete Insurer ',
  props<{ id: number }>(),
);

export const deleteInsurerSuccess = createAction(
  '[Insurer Page] Delete Insurer Success',
  props<{ result: ActionResults }>(),
);

export const deleteInsurerFailure = createAction(
  '[Insurer Page] Delete Insurer Failure',
  props<{ error: string }>(),
);
