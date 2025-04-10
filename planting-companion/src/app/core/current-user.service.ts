import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  updateMyPassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/me/password`, { currentPassword, newPassword });
  }

  getMe(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  deleteMe(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }

  updateMe(userData: any): Observable<any> {
    return this.http.patch<any>(this.apiUrl, userData);
  }
}
