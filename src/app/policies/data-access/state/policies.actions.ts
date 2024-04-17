import { createAction, props } from '@ngrx/store';
import { GetPaginatedPolicies } from './policies.models';
import { Policy } from '../../../shared/interfaces/policy';

export const getPolicies = createAction('[Policies Page] Get All Policies');

export const getPoliciesSuccess = createAction(
  '[Policies Page] Get All Policies Success',
  props<{ policies: Policy[] }>(),
);

export const getPoliciesFailure = createAction(
  '[Policies Page] Get All Policies Failure',
  props<{ error: string }>(),
);

export const getPaginatedPolicies = createAction(
  '[Policies Page] Get Paginated Policies',
  props<{ params: GetPaginatedPolicies }>(),
);

export const getPaginatedPoliciesSuccess = createAction(
  '[Policies Page] Get Paginated Policies Success',
  props<{ policies: Policy[] }>(),
);

export const getPaginatedPoliciesFailure = createAction(
  '[Policies Page] Get Paginated Policies Failure',
  props<{ error: string }>(),
);
