import { Injectable, inject } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import * as CompaniesActions from './companies.actions';
import * as CompaniesSelectors from './companies.selectors';
import { AppState } from '../../../shared/reducers';
import { CreateInsuranceCompany } from '../../../shared/interfaces/insuranceCompany';

@Injectable({ providedIn: 'root' })
export class CompaniesFacade {
  private store: Store<AppState> = inject(Store);

  companies$ = this.store.pipe(select(CompaniesSelectors.getCompanies));
  isLoading$ = this.store.pipe(select(CompaniesSelectors.isLoading));
  error$ = this.store.pipe(select(CompaniesSelectors.getError));

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  getCompanies(): void {
    this.dispatch(CompaniesActions.getCompanies());
  }

  createCompany(company: CreateInsuranceCompany): void {
    this.dispatch(CompaniesActions.createCompany({ company }));
  }

  editCompany(company: CreateInsuranceCompany, id: string): void {
    this.dispatch(CompaniesActions.editCompany({ company, id }));
  }

  deleteCompany(id: string): void {
    this.dispatch(CompaniesActions.deleteCompany({ id }));
  }
}
