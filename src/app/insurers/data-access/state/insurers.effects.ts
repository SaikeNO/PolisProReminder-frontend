import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InsurersService } from '../insurers.service';
import * as InsurersActions from './insurers.actions';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '../../../shared/data-access/snack-bar.service';
import { ActionResultsTypes } from '../../../shared/interfaces/actionResults';
import { MESSAGES } from '../../../shared/messages/insurer';
import { InsurersFacade } from './insurers.facade';

@Injectable()
export class InsurersEffects {
  private actions$ = inject(Actions);
  private insurersService = inject(InsurersService);
  private snackBarService = inject(SnackBarService);
  private insurersFacade = inject(InsurersFacade);

  getAllInsurers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.getAllInsurers),
      mergeMap(() => {
        return this.insurersService.getAllInsurers().pipe(
          map((insurers) => InsurersActions.getAllInsurersSuccess({ insurers })),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.getAllInsurersFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  getPaginatedInsurers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.getPaginatedInsurers),
      mergeMap(({ query }) => {
        return this.insurersService.getPaginatedInsurers(query).pipe(
          map((pageResult) => InsurersActions.getPaginatedInsurersSuccess({ pageResult })),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.getPaginatedInsurersFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  reloadPaginatedPolicies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.reloadPaginatedInsurers),
      withLatestFrom(this.insurersFacade.query$),
      map(([_, query]) => InsurersActions.getPaginatedInsurers({ query })),
    ),
  );

  createInsurer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.createInsurer),
      mergeMap(({ createInsurer }) => {
        return this.insurersService.createInsurer(createInsurer).pipe(
          map(() =>
            InsurersActions.createInsurerSuccess({
              result: { message: MESSAGES.CREATE_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.createInsurerFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  editInsurer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.editInsurer),
      mergeMap(({ createInsurer, id }) => {
        return this.insurersService.editInsurer(createInsurer, id).pipe(
          map(() =>
            InsurersActions.editInsurerSuccess({
              result: { message: MESSAGES.EDIT_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.editInsurerFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  deleteInsurer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.deleteInsurer),
      mergeMap(({ id }) => {
        return this.insurersService.deleteInsurer(id).pipe(
          map(() =>
            InsurersActions.deleteInsurerSuccess({
              result: { message: MESSAGES.DELETE_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.deleteInsurerFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  allActionsReloadPaginatedInsurers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        InsurersActions.createInsurerSuccess,
        InsurersActions.editInsurerSuccess,
        InsurersActions.deleteInsurerSuccess,
      ),
      map(() => InsurersActions.reloadPaginatedInsurers()),
    ),
  );

  allActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          InsurersActions.createInsurerSuccess,
          // InsurersActions.createInsurerFailure,
          InsurersActions.editInsurerSuccess,
          // InsurersActions.editInsurerFailure,
          InsurersActions.deleteInsurerSuccess,
          // InsurersActions.deleteInsurerFailure,
        ),
        map(({ result: { message, type } }) => {
          if (type === ActionResultsTypes.SUCCESS) {
            this.snackBarService.openSucces(message);
          } else if (type === ActionResultsTypes.FAILURE) {
            this.snackBarService.openFailure(message);
          }
        }),
      ),
    { dispatch: false },
  );
}
