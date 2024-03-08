import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('auth-token');

  if (!authToken) return next(req);

  return next(
    req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    })
  );
};
