import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VehicleBrandsService } from '../vehicle-brands.service';
import * as VehicleBrandsActions from './vehicle-brands.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class VehicleBrandsEffects {
  private actions$ = inject(Actions);
  private vehiclesService = inject(VehicleBrandsService);

  getVehicleBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleBrandsActions.getVehicleBrands),
      mergeMap(() => {
        return this.vehiclesService.getVehicleBrands().pipe(
          map((vehicleBrands) => VehicleBrandsActions.getVehicleBrandsSuccess({ vehicleBrands })),
          catchError((error: HttpErrorResponse) =>
            of(VehicleBrandsActions.getVehicleBrandsFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );
}
