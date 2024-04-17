import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { LoadingBarService } from '../data-access/loading-bar.service';

export class LoadingInterceptor implements HttpInterceptor {
  private loadingBarService = inject(LoadingBarService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      tap(() => this.loadingBarService.setIsLoading(true)),
      finalize(() => this.loadingBarService.setIsLoading(false))
    );
  }
}
