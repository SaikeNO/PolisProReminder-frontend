import { ApplicationConfig, LOCALE_ID, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common';
import localePL from '@angular/common/locales/pl';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { reducers } from './shared/reducers';
import { PoliciesEffects } from './policies/data-access/state/policies.effects';
import { httpInterceptorProviders } from './shared/interceptors';
import { CompaniesEffects } from './insurance-company/data-access/state/companies.effects';
import { InsuranceTypesEffects } from './insurance-types/data-access/state/insurance-types.effects';
import { InsurersEffects } from './insurers/data-access/state/insurers.effects';
import { VehiclesEffects } from './vehicles/data-access/state/vehicles.effects';
import { VehicleBrandsEffects } from './vehicle-brands/data-access/state/vehicle-brands.effects';
import { provideServiceWorker } from '@angular/service-worker';

registerLocaleData(localePL, 'pl');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    httpInterceptorProviders,
    provideStore(reducers),
    provideEffects(PoliciesEffects, InsurersEffects, CompaniesEffects, InsuranceTypesEffects, VehiclesEffects, VehicleBrandsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: LOCALE_ID, useValue: 'pl' },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'YYYY/MM/dd' } },
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
],
};
