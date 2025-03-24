import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'access_token';

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    // Implement token validation logic here
    return !!token;
  }
}
