import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InsurersService } from '../insurers.service';
import * as InsurersActions from './insurers.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class InsurersEffects {
  private actions$ = inject(Actions);
  private insurersService = inject(InsurersService);

  getInsurers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsurersActions.getInsurers),
      mergeMap(() => {
        return this.insurersService.getInsurers().pipe(
          map((insurers) => InsurersActions.getInsurersSuccess({ insurers })),
          catchError((error: HttpErrorResponse) =>
            of(InsurersActions.getInsurersFailure({ error: error.message })),
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
            of(InsurersActions.getPaginatedInsurersFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );
}
