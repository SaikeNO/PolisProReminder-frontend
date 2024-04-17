import { createAction, props } from '@ngrx/store';
import {
  CreateInsuranceCompany,
  InsuranceCompany,
} from '../../../shared/interfaces/insuranceCompany';

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
