import { createAction, props } from '@ngrx/store';
import { CreateVehicle, Vehicle } from '../../../shared/interfaces/vehicle';
import { ActionResults } from '../../../shared/interfaces/actionResults';
import { GetQuery } from '../../../shared/interfaces/getQuery';
import { PageResult } from '../../../shared/interfaces/pageResult';
import { Attachment } from '../../../shared/interfaces/attachment';

export const getPaginatedVehicles = createAction(
  '[Vehicles Page] Get Paginated Vehicles',
  props<{ query: GetQuery }>(),
);

export const getPaginatedVehiclesSuccess = createAction(
  '[Vehicles Page] Get Paginated Vehicles Success',
  props<{ pageResult: PageResult<Vehicle> }>(),
);

export const getPaginatedVehiclesFailure = createAction(
  '[Vehicles Page] Get Paginated Vehicles Failure',
  props<{ error: string }>(),
);

export const reloadPaginatedVehicles = createAction('[Vehicles Page] Reload Paginated Vehicles');

export const reloadPaginatedVehiclesSuccess = createAction(
  '[Vehicles Page] Reload Paginated Vehicles Success',
  props<{ pageResult: PageResult<Vehicle> }>(),
);

export const relaodPaginatedVehiclesFailure = createAction(
  '[Vehicles Page] Reload Paginated Vehicles Failure',
  props<{ error: string }>(),
);

export const createVehicle = createAction(
  '[Vehicles Page] Create Vehicle',
  props<{ createVehicle: CreateVehicle }>(),
);

export const createVehicleSuccess = createAction(
  '[Vehicles Page] Create Vehicle Success',
  props<{ result: ActionResults }>(),
);

export const createVehicleFailure = createAction(
  '[Vehicles Page] Create Vehicle Failure',
  props<{ error: string }>(),
);

export const editVehicle = createAction(
  '[Vehicle Page] Edit Vehicle ',
  props<{ createVehicle: CreateVehicle; id: string }>(),
);

export const editVehicleSuccess = createAction(
  '[Vehicle Page] Edit Vehicle Success',
  props<{ result: ActionResults }>(),
);

export const editVehicleFailure = createAction(
  '[Vehicle Page] Edit Vehicle Failure',
  props<{ error: string }>(),
);

export const deleteVehicle = createAction(
  '[Vehicle Page] Delete Vehicle ',
  props<{ id: string }>(),
);

export const deleteVehicleSuccess = createAction(
  '[Vehicle Page] Delete Vehicle Success',
  props<{ result: ActionResults }>(),
);

export const deleteVehicleFailure = createAction(
  '[Vehicle Page] Delete Vehicle Failure',
  props<{ error: string }>(),
);

export const getAttachments = createAction(
  '[Vehicle Page] Get Vehicle Attachments ',
  props<{ id: string }>(),
);

export const getAttachmentsSuccess = createAction(
  '[Vehicle Page] Get Vehicle Attachments Success',
  props<{ attachments: Attachment[] }>(),
);

export const getAttachmentsFailure = createAction(
  '[Vehicle Page] Get Vehicle Attachments Failure',
  props<{ error: string }>(),
);

export const clearAttachments = createAction('[Vehicle Page] Clear Vehicle Attachments');
