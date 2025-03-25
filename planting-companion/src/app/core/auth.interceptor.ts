import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const authReq = tokenService.getToken() 
    ? req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${tokenService.getToken()}`
        )
      })
    : req;

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login'], {
          queryParams: { sessionExpired: true }
        });
      }
      return throwError(() => error);
    })
  );
};


