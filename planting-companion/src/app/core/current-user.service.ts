import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/users';

  updateMyPassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/me/password`, { currentPassword, newPassword }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  getMe(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  deleteMe(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/me`);
  }

  updateMe(userData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/me`, userData);
  }
}
