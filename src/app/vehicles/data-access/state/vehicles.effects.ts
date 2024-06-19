import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VehiclesService } from '../vehicles.service';
import * as VehiclesActions from './vehicles.actions';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '../../../shared/data-access/snack-bar.service';
import { ActionResultsTypes } from '../../../shared/interfaces/actionResults';
import { MESSAGES } from '../../../shared/messages/vehicles';
import { VehiclesFacade } from './vehicles.facade';

@Injectable()
export class VehiclesEffects {
  private actions$ = inject(Actions);
  private vehiclesService = inject(VehiclesService);
  private snackBarService = inject(SnackBarService);
  private vehiclesFacade = inject(VehiclesFacade);

  getPaginatedVehicles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehiclesActions.getPaginatedVehicles),
      mergeMap(({ query }) => {
        return this.vehiclesService.getVehicles(query).pipe(
          map((pageResult) => VehiclesActions.getPaginatedVehiclesSuccess({ pageResult })),
          catchError((error: HttpErrorResponse) =>
            of(VehiclesActions.getPaginatedVehiclesFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  reloadPaginatedVehicles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehiclesActions.reloadPaginatedVehicles),
      withLatestFrom(this.vehiclesFacade.query$),
      map(([_, query]) => VehiclesActions.getPaginatedVehicles({ query })),
    ),
  );

  createVehicle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehiclesActions.createVehicle),
      mergeMap(({ createVehicle }) => {
        return this.vehiclesService.createVehicle(createVehicle).pipe(
          map(() =>
            VehiclesActions.createVehicleSuccess({
              result: { message: MESSAGES.CREATE_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(VehiclesActions.createVehicleFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  editVehicle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehiclesActions.editVehicle),
      mergeMap(({ createVehicle, id }) => {
        return this.vehiclesService.editVehicle(createVehicle, id).pipe(
          map(() =>
            VehiclesActions.editVehicleSuccess({
              result: { message: MESSAGES.EDIT_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(VehiclesActions.editVehicleFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  deleteVehicle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehiclesActions.deleteVehicle),
      mergeMap(({ id }) => {
        return this.vehiclesService.deleteVehicle(id).pipe(
          map(() =>
            VehiclesActions.deleteVehicleSuccess({
              result: { message: MESSAGES.DELETE_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(VehiclesActions.deleteVehicleFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  allActionsReloadPaginatedVehicles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        VehiclesActions.createVehicleSuccess,
        VehiclesActions.editVehicleSuccess,
        VehiclesActions.deleteVehicleSuccess,
      ),
      map(() => VehiclesActions.reloadPaginatedVehicles()),
    ),
  );

  allActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          VehiclesActions.createVehicleSuccess,
          // VehiclesActions.createVehicleFailure,
          VehiclesActions.editVehicleSuccess,
          // VehiclesActions.editVehicleFailure,
          VehiclesActions.deleteVehicleSuccess,
          // VehiclesActions.deleteVehicleFailure,
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
