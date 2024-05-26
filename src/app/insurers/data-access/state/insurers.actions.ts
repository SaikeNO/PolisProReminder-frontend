import { createAction, props } from '@ngrx/store';
import { CreateInsurer, Insurer } from '../../../shared/interfaces/insurer';
import { ActionResults } from '../../../shared/interfaces/actionResults';
import { GetQuery } from '../../../shared/interfaces/getQuery';
import { PageResult } from '../../../shared/interfaces/pageResult';

export const getAllInsurers = createAction('[Insurers Page] Get All Insurers');

export const getAllInsurersSuccess = createAction(
  '[Insurers Page] Get All Insurers Success',
  props<{ insurers: Insurer[] }>(),
);

export const getAllInsurersFailure = createAction(
  '[Insurers Page] Get All Insurers Failure',
  props<{ error: string }>(),
);

export const getPaginatedInsurers = createAction(
  '[Insurers Page] Get Paginated Insurers',
  props<{ query: GetQuery }>(),
);

export const getPaginatedInsurersSuccess = createAction(
  '[Insurers Page] Get Paginated Insurers Success',
  props<{ pageResult: PageResult<Insurer> }>(),
);

export const getPaginatedInsurersFailure = createAction(
  '[Insurers Page] Get Paginated Insurers Failure',
  props<{ error: string }>(),
);

export const reloadPaginatedInsurers = createAction('[Insurers Page] Reload Paginated Insurers');

export const reloadPaginatedInsurersSuccess = createAction(
  '[Insurers Page] Reload Paginated Insurers Success',
  props<{ pageResult: PageResult<Insurer> }>(),
);

export const relaodPaginatedInsurersFailure = createAction(
  '[Insurers Page] Reload Paginated Insurers Failure',
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
