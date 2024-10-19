import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PoliciesService } from '../policies.service';
import * as PoliciesActions from './policies.actions';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionResultsTypes } from '../../../shared/interfaces/actionResults';
import { MESSAGES } from '../../../shared/messages/policies';
import { PoliciesFacade } from './policies.facade';
import { SnackBarService } from '../../../shared/data-access/snack-bar.service';
import { PortalService } from '../../../shared/data-access/portal.service';

@Injectable()
export class PoliciesEffects {
  private actions$ = inject(Actions);
  private policiesService = inject(PoliciesService);
  private snackBarService = inject(SnackBarService);
  private policiesFacade = inject(PoliciesFacade);
  private portalService = inject(PortalService);

  getPolicies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoliciesActions.getPolicies),
      mergeMap(({ query }) => {
        return this.policiesService.getPolicies(query).pipe(
          map((pageResult) => PoliciesActions.getPoliciesSuccess({ pageResult })),
          catchError((error: HttpErrorResponse) =>
            of(PoliciesActions.getPoliciesFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );

  getLatestPolicies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoliciesActions.getLatestPolicies),
      mergeMap(({ count }) => {
        return this.policiesService.getLatestPolicies(count).pipe(
          map((policies) => PoliciesActions.getLatestPoliciesSuccess({ policies })),
          catchError((error: HttpErrorResponse) =>
            of(PoliciesActions.getLatestPoliciesFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );

  reloadPolicies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoliciesActions.reloadPolicies),
      withLatestFrom(this.policiesFacade.query$),
      map(([_, query]) => PoliciesActions.getPolicies({ query })),
    ),
  );

  createPolicy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoliciesActions.createPolicy),
      mergeMap(({ createPolicy }) => {
        return this.policiesService.createPolicy(createPolicy).pipe(
          map(() =>
            PoliciesActions.createPolicySuccess({
              result: { message: MESSAGES.CREATE_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(PoliciesActions.createPolicyFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  editPolicy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoliciesActions.editPolicy),
      mergeMap(({ createPolicy, id }) => {
        return this.policiesService.editPolicy(createPolicy, id).pipe(
          map(() =>
            PoliciesActions.editPolicySuccess({
              result: { message: MESSAGES.EDIT_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(PoliciesActions.editPolicyFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  deletePolicy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoliciesActions.deletePolicy),
      mergeMap(({ policyId }) => {
        return this.policiesService.deletePolicy(policyId).pipe(
          map(() =>
            PoliciesActions.deletePolicySuccess({
              result: { message: MESSAGES.DELETE_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(PoliciesActions.deletePolicyFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  deletePolicyBatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoliciesActions.deletePolicyBatch),
      mergeMap(({ policyIds }) => {
        return this.policiesService.deletePolicyBatch(policyIds).pipe(
          map(() =>
            PoliciesActions.deletePolicyBatchSuccess({
              result: { message: MESSAGES.DELETE_BATCH_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(PoliciesActions.deletePolicyBatchFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  allActionsReloadPolicies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PoliciesActions.createPolicySuccess,
        PoliciesActions.editPolicySuccess,
        PoliciesActions.deletePolicySuccess,
      ),
      map(() => PoliciesActions.reloadPolicies()),
    ),
  );

  allActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          PoliciesActions.createPolicySuccess,
          // PoliciesActions.createPolicyFailure,
          PoliciesActions.editPolicySuccess,
          // PoliciesActions.editInsurerFailure,
          PoliciesActions.deletePolicySuccess,
          PoliciesActions.deletePolicyBatchSuccess,
          // PoliciesActions.deleteInsurerFailure,
        ),
        map(({ result: { message, type } }) => {
          if (type === ActionResultsTypes.SUCCESS) {
            this.snackBarService.openSucces(message);
            this.portalService.closePortal();
          } else if (type === ActionResultsTypes.FAILURE) {
            this.snackBarService.openFailure(message);
          }
        }),
      ),
    { dispatch: false },
  );
}
