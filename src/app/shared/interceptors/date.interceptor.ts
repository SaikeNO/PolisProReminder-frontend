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

  private convertStringsToDates(body: any): any {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body === 'string' && this.isDateString(body)) {
      return moment(body, 'YYYY-MM-DD').toDate();
    }

    if (Array.isArray(body)) {
      return body.map((item) => this.convertStringsToDates(item));
    }

    if (typeof body === 'object' && body !== null) {
      const newBody = { ...body };
      Object.keys(newBody).forEach((key) => {
        newBody[key] = this.convertStringsToDates(newBody[key]);
      });
      return newBody;
    }

    return body;
  }

  private isDate(value: any): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  }

  private convertDatesToStrings(body: any): any {
    if (body === null || body === undefined) {
      return body;
    }

    if (this.isDate(body)) {
      return moment(body).format('YYYY-MM-DD');
    }

    if (Array.isArray(body)) {
      return body.map((item) => this.convertDatesToStrings(item));
    }

    if (typeof body === 'object' && body !== null) {
      const newBody = { ...body };
      Object.keys(newBody).forEach((key) => {
        newBody[key] = this.convertDatesToStrings(newBody[key]);
      });
      return newBody;
    }

    return body;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      body: this.convertDatesToStrings(req.body),
    });

    return next.handle(modifiedReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body) {
          const body = this.convertStringsToDates(event.body);
          return event.clone({ body });
        }
        return event;
      }),
    );
  }
}
