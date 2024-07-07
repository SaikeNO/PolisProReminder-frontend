import { createAction, props } from '@ngrx/store';
import {
  CreateInsuranceCompany,
  InsuranceCompany,
} from '../../../shared/interfaces/insuranceCompany';
import { ActionResults } from '../../../shared/interfaces/actionResults';

export const getCompanies = createAction('[Insurance Company Page] Get All Companies');

export const getCompaniesSuccess = createAction(
  '[Insurance Company Page] Get All Companies Success',
  props<{ companies: InsuranceCompany[] }>(),
);

export const getCompaniesFailure = createAction(
  '[Insurance Company Page] Get All Companies Failure',
  props<{ error: string }>(),
);

export const createCompany = createAction(
  '[Insurance Company Page] Create Company ',
  props<{ company: CreateInsuranceCompany }>(),
);

export const createCompanySuccess = createAction(
  '[Insurance Company Page] Create Company Success',
  props<{ result: ActionResults }>(),
);

export const createCompanyFailure = createAction(
  '[Insurance Company Page] Create Company Failure',
  props<{ error: string }>(),
);

export const editCompany = createAction(
  '[Insurance Company Page] Edit Company ',
  props<{ company: CreateInsuranceCompany; id: string }>(),
);

export const editCompanySuccess = createAction(
  '[Insurance Company Page] Edit Company Success',
  props<{ result: ActionResults }>(),
);

export const editCompanyFailure = createAction(
  '[Insurance Company Page] Edit Company Failure',
  props<{ error: string }>(),
);

export const deleteCompany = createAction(
  '[Insurance Company Page] Delete Company ',
  props<{ id: string }>(),
);

export const deleteCompanySuccess = createAction(
  '[Insurance Company Page] Delete Company Success',
  props<{ result: ActionResults }>(),
);

export const deleteCompanyFailure = createAction(
  '[Insurance Company Page] Delete Company Failure',
  props<{ error: string }>(),
);
