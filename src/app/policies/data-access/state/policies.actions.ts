import { createAction, props } from '@ngrx/store';
import { Policy } from '../../../shared/interfaces/policy';
import { GetQuery } from '../../../shared/interfaces/getQuery';
import { PageResult } from '../../../shared/interfaces/pageResult';
import { ActionResults } from '../../../shared/interfaces/actionResults';

export const getPolicies = createAction(
  '[Policies Page] Get Policies',
  props<{ query: GetQuery }>(),
);

export const getPoliciesSuccess = createAction(
  '[Policies Page] Get Policies Success',
  props<{ pageResult: PageResult<Policy> }>(),
);

export const getPoliciesFailure = createAction(
  '[Policies Page] Get Policies Failure',
  props<{ error: string }>(),
);

export const reloadPolicies = createAction('[Policies Page] Reload Policies');

export const reloadPoliciesSuccess = createAction(
  '[Policies Page] Reload Policies Success',
  props<{ pageResult: PageResult<Policy> }>(),
);

export const relaodPoliciesFailure = createAction(
  '[Policies Page] Get Policies Failure',
  props<{ error: string }>(),
);

export const deletePolicy = createAction(
  '[Policies Page] Delete Policy ',
  props<{ policyId: number }>(),
);

export const deletePolicySuccess = createAction(
  '[Policies Page] Delete Policy Success',
  props<{ result: ActionResults }>(),
);

export const deletePolicyFailure = createAction(
  '[Policies Page] Delete Policy Failure',
  props<{ error: string }>(),
);
