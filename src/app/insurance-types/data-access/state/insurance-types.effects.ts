import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as InsuranceTypesActions from './insurance-types.actions';
import { SnackBarService } from '../../../shared/data-access/snack-bar.service';
import { ActionResultsTypes } from '../../../shared/interfaces/actionResults';
import { MESSAGES } from '../../../shared/messages/insurance-types';
import { InsuranceTypesService } from '../insurance-types.service';

@Injectable()
export class InsuranceTypesEffects {
  private actions$ = inject(Actions);
  private insuranceTypesService = inject(InsuranceTypesService);
  private snackBarService = inject(SnackBarService);

  getInsuranceTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        InsuranceTypesActions.getInsuranceTypes,
        InsuranceTypesActions.createInsuranceTypeSuccess,
        InsuranceTypesActions.deleteInsuranceTypeSuccess,
        InsuranceTypesActions.editInsuranceTypeSuccess,
      ),
      mergeMap(() => {
        return this.insuranceTypesService.getInsuranceTypes().pipe(
          map((insuranceTypes) =>
            InsuranceTypesActions.getInsuranceTypesSuccess({ insuranceTypes }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(InsuranceTypesActions.getInsuranceTypesFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );

  createInsuranceType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsuranceTypesActions.createInsuranceType),
      mergeMap(({ insuranceType }) => {
        return this.insuranceTypesService.createInsuranceType(insuranceType).pipe(
          map(() =>
            InsuranceTypesActions.createInsuranceTypeSuccess({
              result: { message: MESSAGES.CREATE_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(InsuranceTypesActions.createInsuranceTypeFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  editInsuranceType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsuranceTypesActions.editInsuranceType),
      mergeMap(({ insuranceType, id }) => {
        return this.insuranceTypesService.editInsuranceType(insuranceType, id).pipe(
          map(() =>
            InsuranceTypesActions.editInsuranceTypeSuccess({
              result: { message: MESSAGES.EDIT_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(InsuranceTypesActions.editInsuranceTypeFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  deleteInsuranceType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsuranceTypesActions.deleteInsuranceType),
      mergeMap(({ id }) => {
        return this.insuranceTypesService.deleteInsuranceType(id).pipe(
          map(() =>
            InsuranceTypesActions.deleteInsuranceTypeSuccess({
              result: { message: MESSAGES.DELETE_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(InsuranceTypesActions.deleteInsuranceTypeFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  allActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          InsuranceTypesActions.createInsuranceTypeSuccess,
          // InsuranceTypesActions.createInsuranceTypeFailure,
          InsuranceTypesActions.editInsuranceTypeSuccess,
          // InsuranceTypesActions.editInsuranceTypeFailure,
          InsuranceTypesActions.deleteInsuranceTypeSuccess,
          // InsuranceTypesActions.deleteInsuranceTypeFailure,
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
