import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CompaniesActions from './companies.actions';
import { InsuranceCompanyService } from '../insurance-company.service';
import { SnackBarService } from '../../../shared/data-access/snack-bar.service';
import { ActionResultsTypes } from '../../../shared/interfaces/actionResults';
import { MESSAGES } from '../../../shared/messages/insurance-companies';

@Injectable()
export class CompaniesEffects {
  private actions$ = inject(Actions);
  private companiesService = inject(InsuranceCompanyService);
  private snackBarService = inject(SnackBarService);

  getCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CompaniesActions.getCompanies,
        CompaniesActions.createCompanySuccess,
        CompaniesActions.deleteCompanySuccess,
        CompaniesActions.editCompanySuccess,
      ),
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
        return this.companiesService.createCompany(company).pipe(
          map(() =>
            CompaniesActions.createCompanySuccess({
              result: { message: MESSAGES.CREATE_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(CompaniesActions.createCompanyFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  editCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompaniesActions.editCompany),
      mergeMap(({ company, id }) => {
        return this.companiesService.editCompany(company, id).pipe(
          map(() =>
            CompaniesActions.editCompanySuccess({
              result: { message: MESSAGES.EDIT_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(CompaniesActions.editCompanyFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  deleteCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompaniesActions.deleteCompany),
      mergeMap(({ id }) => {
        return this.companiesService.deleteCompany(id).pipe(
          map(() =>
            CompaniesActions.deleteCompanySuccess({
              result: { message: MESSAGES.DELETE_SUCCESS, type: ActionResultsTypes.SUCCESS },
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(CompaniesActions.deleteCompanyFailure({ error: error.error })),
          ),
        );
      }),
    ),
  );

  allActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CompaniesActions.createCompanySuccess,
          // CompaniesActions.createCompanyFailure,
          CompaniesActions.editCompanySuccess,
          // CompaniesActions.editCompanyFailure,
          CompaniesActions.deleteCompanySuccess,
          // CompaniesActions.deleteCompanyFailure,
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
