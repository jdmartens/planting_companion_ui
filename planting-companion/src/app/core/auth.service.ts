import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, interval, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { UserStateService } from '../store/user-state.service';

export interface LoginResponse {
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);
  private readonly userStateService = inject(UserStateService);
  private readonly apiUrl = environment.apiUrl;

  login(email: string, password: string) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login/access-token`,
      formData
    ).pipe(
      tap(response => {
        if (response?.access_token) {
          this.handleLoginSuccess(response.access_token);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error?.detail || 'Login failed');
      })
    );
  }

  handleLoginSuccess(token: string) {
    this.tokenService.setToken(token); 
    this.userStateService.setUser(response.full_name, response.email); 
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login'], {
      queryParams: { sessionExpired: true },
      replaceUrl: true
    });
  }

  startSessionMonitoring() {
    interval(30000).subscribe(() => {
      if (!this.tokenService.isTokenValid()) {
        this.logout();
      }
    });
  }

  isLoggedIn(): boolean {
    return this.tokenService.isTokenValid();
  }
}
