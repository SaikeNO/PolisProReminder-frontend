import { createAction, props } from '@ngrx/store';
import { ActionResults } from '../../../shared/interfaces/actionResults';
import { CreateInsuranceType, InsuranceType } from '../../../shared/interfaces/insuranceType';

export const getInsuranceTypes = createAction('[Insurance Types Page] Get All Insurance Types');

export const getInsuranceTypesSuccess = createAction(
  '[Insurance Types Page] Get All Insurance Types Success',
  props<{ insuranceTypes: InsuranceType[] }>(),
);

export const getInsuranceTypesFailure = createAction(
  '[Insurance Types Page] Get All Insurance Types Failure',
  props<{ error: string }>(),
);

export const createInsuranceType = createAction(
  '[Insurance Types Page] Create Insurance Type ',
  props<{ insuranceType: CreateInsuranceType }>(),
);

export const createInsuranceTypeSuccess = createAction(
  '[Insurance Types Page] Create Insurance Type Success',
  props<{ result: ActionResults }>(),
);

export const createInsuranceTypeFailure = createAction(
  '[Insurance Types Page] Create Insurance Type Failure',
  props<{ error: string }>(),
);

export const editInsuranceType = createAction(
  '[Insurance Types Page] Edit Insurance Type ',
  props<{ insuranceType: CreateInsuranceType; id: string }>(),
);

export const editInsuranceTypeSuccess = createAction(
  '[Insurance Types Page] Edit Insurance Type Success',
  props<{ result: ActionResults }>(),
);

export const editInsuranceTypeFailure = createAction(
  '[Insurance Types Page] Edit Insurance Type Failure',
  props<{ error: string }>(),
);

export const deleteInsuranceType = createAction(
  '[Insurance Types Page] Delete Insurance Type ',
  props<{ id: string }>(),
);

export const deleteInsuranceTypeSuccess = createAction(
  '[Insurance Types Page] Delete Insurance Type Success',
  props<{ result: ActionResults }>(),
);

export const deleteInsuranceTypeFailure = createAction(
  '[Insurance Types Page] Delete Insurance Type Failure',
  props<{ error: string }>(),
);
