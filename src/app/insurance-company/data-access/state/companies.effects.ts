import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CompaniesActions from './companies.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InsuranceCompanyService } from '../insurance-company.service';

@Injectable()
export class CompaniesEffects {
  private actions$ = inject(Actions);
  private companiesService = inject(InsuranceCompanyService);

  getCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompaniesActions.getCompanies),
      mergeMap(() => {
        return this.companiesService.getCompanies().pipe(
          map((companies) => CompaniesActions.getCompaniesSuccess({ companies })),
          catchError((error: HttpErrorResponse) =>
            of(CompaniesActions.getCompaniesFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );

  createCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompaniesActions.createCompany),
      mergeMap(({ company }) => {
        return this.companiesService
          .createCompany(company)
          .pipe(map(() => CompaniesActions.getCompanies()));
      }),
    ),
  );
}
