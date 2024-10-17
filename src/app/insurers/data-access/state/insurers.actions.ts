import { createAction, props } from '@ngrx/store';
import {
  BusinessInsurer,
  CreateBusinessInsurer,
  CreateIndividualInsurer,
  IndividualInsurer,
  InsurerBasicInfo,
} from '../../../shared/interfaces/insurer';
import { ActionResults } from '../../../shared/interfaces/actionResults';
import { GetQuery } from '../../../shared/interfaces/getQuery';
import { PageResult } from '../../../shared/interfaces/pageResult';

export const getAllInsurers = createAction('[Insurers Page] Get All Insurers');

export const getAllInsurersSuccess = createAction(
  '[Insurers Page] Get All Insurers Success',
  props<{ insurers: InsurerBasicInfo[] }>(),
);

export const getAllInsurersFailure = createAction(
  '[Insurers Page] Get All Insurers Failure',
  props<{ error: string }>(),
);

export const deleteInsurer = createAction(
  '[Insurer Page] Delete Insurer ',
  props<{ id: string }>(),
);

export const deleteInsurerSuccess = createAction(
  '[Insurer Page] Delete Insurer Success',
  props<{ result: ActionResults }>(),
);

export const deleteInsurerFailure = createAction(
  '[Insurer Page] Delete Insurer Failure',
  props<{ error: string }>(),
);

//Individual

export const getPaginatedIndividualInsurers = createAction(
  '[Insurers Page] Get Paginated Individual Insurers',
  props<{ query: GetQuery }>(),
);

export const getPaginatedIndividualInsurersSuccess = createAction(
  '[Insurers Page] Get Paginated Individual Insurers Success',
  props<{ pageResult: PageResult<IndividualInsurer> }>(),
);

export const getPaginatedIndividualInsurersFailure = createAction(
  '[Insurers Page] Get Paginated Individual Insurers Failure',
  props<{ error: string }>(),
);

export const reloadPaginatedIndividualInsurers = createAction(
  '[Insurers Page] Reload Paginated Individual Insurers',
);

export const reloadPaginatedIndividualInsurersSuccess = createAction(
  '[Insurers Page] Reload Paginated Individual Insurers Success',
  props<{ pageResult: PageResult<IndividualInsurer> }>(),
);

export const relaodPaginatedIndividualInsurersFailure = createAction(
  '[Insurers Page] Reload Paginated Individual Insurers Failure',
  props<{ error: string }>(),
);

export const createIndividualInsurer = createAction(
  '[Insurers Page] Create Individual Insurer',
  props<{ createInsurer: CreateIndividualInsurer }>(),
);

export const createIndividualInsurerSuccess = createAction(
  '[Insurers Page] Create Individual Insurer Success',
  props<{ result: ActionResults }>(),
);

export const createIndividualInsurerFailure = createAction(
  '[Insurers Page] Create Individual Insurer Failure',
  props<{ error: string }>(),
);

export const editIndividualInsurer = createAction(
  '[Insurer Page] Edit Individual Insurer ',
  props<{ createInsurer: CreateIndividualInsurer; id: string }>(),
);

export const editIndividualInsurerSuccess = createAction(
  '[Insurer Page] Edit Individual Insurer Success',
  props<{ result: ActionResults }>(),
);

export const editIndividualInsurerFailure = createAction(
  '[Insurer Page] Edit Individual Insurer Failure',
  props<{ error: string }>(),
);

//Business

export const getPaginatedBusinessInsurers = createAction(
  '[Insurers Page] Get Paginated Business Insurers',
  props<{ query: GetQuery }>(),
);

export const getPaginatedBusinessInsurersSuccess = createAction(
  '[Insurers Page] Get Paginated Business Insurers Success',
  props<{ pageResult: PageResult<BusinessInsurer> }>(),
);

export const getPaginatedBusinessInsurersFailure = createAction(
  '[Insurers Page] Get Paginated Business Insurers Failure',
  props<{ error: string }>(),
);

export const reloadPaginatedBusinessInsurers = createAction(
  '[Insurers Page] Reload Paginated Business Insurers',
);

export const reloadPaginatedBusinessInsurersSuccess = createAction(
  '[Insurers Page] Reload Paginated Business Insurers Success',
  props<{ pageResult: PageResult<BusinessInsurer> }>(),
);

export const relaodPaginatedBusinessInsurersFailure = createAction(
  '[Insurers Page] Reload Paginated Business Insurers Failure',
  props<{ error: string }>(),
);

export const createBusinessInsurer = createAction(
  '[Insurers Page] Create Business Insurer',
  props<{ createInsurer: CreateBusinessInsurer }>(),
);

export const createBusinessInsurerSuccess = createAction(
  '[Insurers Page] Create Business Insurer Success',
  props<{ result: ActionResults }>(),
);

export const createBusinessInsurerFailure = createAction(
  '[Insurers Page] Create Business Insurer Failure',
  props<{ error: string }>(),
);

export const editBusinessInsurer = createAction(
  '[Insurer Page] Edit Business Insurer ',
  props<{ createInsurer: CreateBusinessInsurer; id: string }>(),
);

export const editBusinessInsurerSuccess = createAction(
  '[Insurer Page] Edit Business Insurer Success',
  props<{ result: ActionResults }>(),
);

export const editBusinessInsurerFailure = createAction(
  '[Insurer Page] Edit Business Insurer Failure',
  props<{ error: string }>(),
);
