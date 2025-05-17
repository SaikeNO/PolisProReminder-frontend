import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../data-access/auth.service';
import { StorageService } from '../data-access/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private storageService = inject(StorageService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject<void>();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  addAuthHeader(request: HttpRequest<any>) {
    const accessToken = this.storageService.getAccessToken();
    if (accessToken) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
    }
    return request;
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable((observer) => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next(undefined);
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      const refreshToken = this.storageService.getRefreshToken();

      return this.authService.refreshToken(refreshToken!).pipe(
        tap(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        }),
        catchError((err: HttpErrorResponse) => {
          this.refreshTokenInProgress = false;
          this.logout();
          return throwError(() => err);
        }),
      );
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  handleResponseError(
    error: HttpErrorResponse,
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<any> {
    // Business error
    if (error.status !== 401) {
      this.snackBar.open(error.error, undefined, { duration: 2000 });
    }

    if (error.error === 'Token expired') {
      this.logout();
    }

    if (error.status === 400) {
      // Show message
    }

    // Invalid token error
    else if (
      error.status === 401 &&
      request.url !== `${environment.API_URL}/identity/refresh` &&
      request.url !== `${environment.API_URL}/identity/confirmEmail` &&
      request.url !== `${environment.API_URL}/identity/login` &&
      request.url !== `${environment.API_URL}/user/info`
    ) {
      return this.refreshToken().pipe(
        switchMap(() => {
          request = this.addAuthHeader(request);
          return next.handle(request);
        }),
        catchError((e: HttpErrorResponse) => {
          if (e.status !== 401) {
            return this.handleResponseError(e, request, next);
          } else {
            this.logout();
          }
          return throwError(() => e);
        }),
      );
    }

    // Access denied error
    else if (error.status === 403) {
      // Show message
      // Logout
    }

    // Server error
    else if (error.status === 500) {
      // Show message
    }

    // Maintenance error
    else if (error.status === 503) {
      // Show message
      // Redirect to the maintenance page
    }

    return throwError(() => error);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle request
    request = this.addAuthHeader(request);

    // Handle response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleResponseError(error, request, next);
      }),
    );
  }
}
