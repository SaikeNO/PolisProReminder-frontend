import { createAction, props } from '@ngrx/store';
import { CreatePolicy, Policy } from '../../../shared/interfaces/policy';
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

export const getLatestPolicies = createAction(
  '[Policies Page] Get Latest Policies',
  props<{ count: number }>(),
);

export const getLatestPoliciesSuccess = createAction(
  '[Policies Page] Get Latest Policies Success',
  props<{ policies: Policy[] }>(),
);

export const getLatestPoliciesFailure = createAction(
  '[Policies Page] Get Latest Policies Failure',
  props<{ error: string }>(),
);

export const reloadPolicies = createAction('[Policies Page] Reload Policies');

export const reloadPoliciesSuccess = createAction(
  '[Policies Page] Reload Policies Success',
  props<{ pageResult: PageResult<Policy> }>(),
);

export const relaodPoliciesFailure = createAction(
  '[Policies Page] Reload Policies Failure',
  props<{ error: string }>(),
);

export const createPolicy = createAction(
  '[Policies Page] Create Policy',
  props<{ createPolicy: CreatePolicy }>(),
);

export const createPolicySuccess = createAction(
  '[Policies Page] Create Policy Success',
  props<{ result: ActionResults }>(),
);

export const createPolicyFailure = createAction(
  '[Policies Page] Create Policy Failure',
  props<{ error: string }>(),
);

export const editPolicy = createAction(
  '[Policies Page] Edit Policy ',
  props<{ createPolicy: CreatePolicy; id: number }>(),
);

export const editPolicySuccess = createAction(
  '[Policies Page] Edit Policy Success',
  props<{ result: ActionResults }>(),
);

export const editPolicyFailure = createAction(
  '[Policies Page] Edit Policy Failure',
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
