import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { isAuthenticatedGuard } from './shared/guards/auth.guard';
import { AppLayoutComponent } from './shared/ui/app-layout/app-layout.component';
import { PoliciesComponent } from './policies/policies.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [isAuthenticatedGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'policies', loadComponent: () => PoliciesComponent },
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];
