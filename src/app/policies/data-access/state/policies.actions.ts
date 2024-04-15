import { createAction, props } from '@ngrx/store';
import { GetPolicies } from './policies.models';
import { Policy } from '../../../shared/interfaces/policy';

export const getPolicies = createAction(
  '[Policies Page] Get All Policies',
  props<{ params: GetPolicies }>()
);

export const getPoliciesSuccess = createAction(
  '[Policies Page] Get All Policies Success',
  props<{ policies: Policy[] }>()
);

export const getPoliciesFailure = createAction(
  '[Policies Page] Get All Policies Failure',
  props<{ error: string }>()
);
