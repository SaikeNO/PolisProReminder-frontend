import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/ui/app-layout/app-layout.component').then((mod) => mod.AppLayoutComponent),
    canActivateChild: [isAuthenticatedGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then((mod) => mod.HomeComponent),
      },
      {
        path: 'policies',
        loadComponent: () =>
          import('./policies/policies.component').then((mod) => mod.PoliciesComponent),
      },
      {
        path: 'insurers',
        loadComponent: () =>
          import('./insurers/insurers.component').then((mod) => mod.InsurersComponent),
      },
      {
        path: 'vehicles',
        loadComponent: () =>
          import('./vehicles/vehicles.component').then((mod) => mod.VehiclesComponent),
      },
      {
        path: 'company',
        loadComponent: () =>
          import('./insurance-company/insurance-company.component').then(
            (mod) => mod.InsuranceCompanyComponent,
          ),
      },
      {
        path: 'types',
        loadComponent: () =>
          import('./insurance-types/insurance-types.component').then(
            (mod) => mod.InsuranceTypesComponent,
          ),
      },
    ],
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((mod) => mod.LoginComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then((mod) => mod.PageNotFoundComponent),
  },
];
