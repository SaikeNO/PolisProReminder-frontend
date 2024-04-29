import { createAction, props } from '@ngrx/store';
import { Policy } from '../../../shared/interfaces/policy';
import { GetQuery } from '../../../shared/interfaces/getQuery';
import { PageResult } from '../../../shared/interfaces/pageResult';

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
