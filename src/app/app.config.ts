import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducers } from './shared/reducers';
import { PoliciesEffects } from './policies/data-access/state/policies.effects';
import { httpInterceptorProviders } from './shared/interceptors';
import { CompaniesEffects } from './insurance-company/data-access/state/companies.effects';
import { InsuranceTypesEffects } from './insurance-types/data-access/state/insurance-types.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { InsurersEffects } from './insurers/data-access/state/insurers.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    httpInterceptorProviders,
    provideStore(reducers),
    provideEffects(PoliciesEffects, InsurersEffects, CompaniesEffects, InsuranceTypesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
