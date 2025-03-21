import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export interface LoginResponse {
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = 'http://your-api-url/api';

  login(email: string, password: string) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login/access-token`,
      formData
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error?.detail || 'Login failed');
      })
    );
  }

  handleLoginSuccess(token: string) {
    localStorage.setItem('access_token', token);
    this.router.navigate(['/dashboard']); // Update with your success route
  }
}
