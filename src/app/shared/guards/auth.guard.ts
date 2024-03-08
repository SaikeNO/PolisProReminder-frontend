import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';
import { inject } from '@angular/core';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/login');
};
