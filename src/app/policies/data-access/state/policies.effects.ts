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
}
