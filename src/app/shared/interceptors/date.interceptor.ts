import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

@Injectable()
export class DateInterceptor implements HttpInterceptor {
  private isDateString(value: any): boolean {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
  }

  private convertDates(body: any): any {
    if (body === null || body === undefined || body instanceof Blob) {
      return body;
    }

    if (typeof body === 'string' && this.isDateString(body)) {
      return moment(body, 'YYYY-MM-DD').toDate();
    }

    if (Array.isArray(body)) {
      return body.map((item) => this.convertDates(item));
    }

    if (typeof body === 'object' && body !== null) {
      const newBody = { ...body };
      Object.keys(newBody).forEach((key) => {
        newBody[key] = this.convertDates(newBody[key]);
      });
      return newBody;
    }

    return body;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body) {
          const body = this.convertDates(event.body);
          return event.clone({ body });
        }
        return event;
      }),
    );
  }
}
