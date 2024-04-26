import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InsurersService } from '../insurers.service';
import * as InsurersActions from './insurers.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '../../../shared/data-access/snack-bar.service';
import { ActionResultsTypes } from '../../../shared/interfaces/actionResults';
import { MESSAGES } from '../../../shared/messages/insurer';

@Injectable()
export class InsurersEffects {
  private actions$ = inject(Actions);
  private insurersService = inject(InsurersService);
  private snackBarService = inject(SnackBarService);

  getInsurers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        InsurersActions.getInsurers,
        InsurersActions.createInsurerSuccess,
        InsurersActions.editInsurerSuccess,
        InsurersActions.deleteInsurerSuccess,
      ),
      mergeMap(() => {
        return this.insurersService.getInsurers().pipe(
          map((insurers) => InsurersActions.getInsurersSuccess({ insurers })),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.getInsurersFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  getPaginatedInsurers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.getPaginatedInsurers),
      mergeMap(({ params }) => {
        return this.insurersService.getPaginatedInsurers(params.pageIndex, params.pageSize).pipe(
          map((insurers) => InsurersActions.getPaginatedInsurersSuccess({ insurers })),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.getPaginatedInsurersFailure({ error: error.error })),
          ),
        );
      }),
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
