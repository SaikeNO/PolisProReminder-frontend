import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PoliciesService } from '../policies.service';
import * as PoliciesActions from './policies.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PoliciesEffects {
  private actions$ = inject(Actions);
  private policiesService = inject(PoliciesService);

  getPolicies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoliciesActions.getPolicies),
      mergeMap(() => {
        return this.policiesService.getPolicies().pipe(
          map((policies) => PoliciesActions.getPoliciesSuccess({ policies })),
          catchError((error: HttpErrorResponse) =>
            of(PoliciesActions.getPoliciesFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );

  getPaginatedPolicies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoliciesActions.getPaginatedPolicies),
      mergeMap(({ params }) => {
        console.log(params);
        return this.policiesService.getPaginatedPolicies(params.pageIndex, params.pageSize).pipe(
          map((policies) => PoliciesActions.getPaginatedPoliciesSuccess({ policies })),
          catchError((error: HttpErrorResponse) =>
            of(PoliciesActions.getPaginatedPoliciesFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );
}
