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
import { PortalService } from '../../../shared/data-access/portal.service';

@Injectable()
export class InsurersEffects {
  private actions$ = inject(Actions);
  private insurersService = inject(InsurersService);
  private snackBarService = inject(SnackBarService);
  private insurersFacade = inject(InsurersFacade);
  private portalService = inject(PortalService);

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

  // Individual
  getPaginatedIndividualInsurers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.getPaginatedIndividualInsurers),
      mergeMap(({ query }) => {
        return this.insurersService.getPaginatedIndividualInsurers(query).pipe(
          map((pageResult) =>
            InsurersActions.getPaginatedIndividualInsurersSuccess({ pageResult }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.getPaginatedIndividualInsurersFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  reloadPaginatedIndividualInsurers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.reloadPaginatedIndividualInsurers),
      withLatestFrom(this.insurersFacade.query$),
      map(([_, query]) => InsurersActions.getPaginatedIndividualInsurers({ query })),
    ),
  );

  createIndividualInsurer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.createIndividualInsurer),
      mergeMap(({ createInsurer }) => {
        return this.insurersService.createIndividualInsurer(createInsurer).pipe(
          map(() =>
            InsurersActions.createIndividualInsurerSuccess({
              result: { message: MESSAGES.CREATE_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.createIndividualInsurerFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  editIndividualInsurer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.editIndividualInsurer),
      mergeMap(({ createInsurer, id }) => {
        return this.insurersService.editIndividualInsurer(createInsurer, id).pipe(
          map(() =>
            InsurersActions.editIndividualInsurerSuccess({
              result: { message: MESSAGES.EDIT_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.editIndividualInsurerFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  allActionsReloadPaginatedIndividualInsurers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        InsurersActions.createIndividualInsurerSuccess,
        InsurersActions.editIndividualInsurerSuccess,
        InsurersActions.deleteInsurerSuccess,
      ),
      map(() => InsurersActions.reloadPaginatedIndividualInsurers()),
    ),
  );

  // Business
  getPaginatedBusinessInsurers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.getPaginatedBusinessInsurers),
      mergeMap(({ query }) => {
        return this.insurersService.getPaginatedBusinessInsurers(query).pipe(
          map((pageResult) => InsurersActions.getPaginatedBusinessInsurersSuccess({ pageResult })),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.getPaginatedBusinessInsurersFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  reloadPaginatedBusinessInsurers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.reloadPaginatedBusinessInsurers),
      withLatestFrom(this.insurersFacade.query$),
      map(([_, query]) => InsurersActions.getPaginatedBusinessInsurers({ query })),
    ),
  );

  createBusinessInsurer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.createBusinessInsurer),
      mergeMap(({ createInsurer }) => {
        return this.insurersService.createBusinessInsurer(createInsurer).pipe(
          map(() =>
            InsurersActions.createBusinessInsurerSuccess({
              result: { message: MESSAGES.CREATE_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.createBusinessInsurerFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  editBusinessInsurer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.editBusinessInsurer),
      mergeMap(({ createInsurer, id }) => {
        return this.insurersService.editBusinessInsurer(createInsurer, id).pipe(
          map(() =>
            InsurersActions.editBusinessInsurerSuccess({
              result: { message: MESSAGES.EDIT_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.editBusinessInsurerFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  allActionsReloadPaginatedBusinessInsurers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        InsurersActions.createBusinessInsurerSuccess,
        InsurersActions.editBusinessInsurerSuccess,
        InsurersActions.deleteInsurerSuccess,
      ),
      map(() => InsurersActions.reloadPaginatedBusinessInsurers()),
    ),
  );

  allActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          InsurersActions.createIndividualInsurerSuccess,
          InsurersActions.createBusinessInsurerSuccess,
          // InsurersActions.createInsurerFailure,
          InsurersActions.editIndividualInsurerSuccess,
          InsurersActions.editBusinessInsurerSuccess,
          // InsurersActions.editInsurerFailure,
          InsurersActions.deleteInsurerSuccess,
          // InsurersActions.deleteInsurerFailure,
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
