import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { StorageService } from '../data-access/storage.service';
import { AuthService } from '../data-access/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = inject(StorageService).getAccessToken();
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!accessToken) return next(req);

  req = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + accessToken,
    },
  });

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (!req.url.includes('/account/login') && err.status == 401) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            return next(req);
          }),
          catchError((err: HttpErrorResponse) => {
            if (err.message === 'Token expired') {
              authService.logout();
              router.navigate(['/login']);
            }

            return throwError(() => err);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
