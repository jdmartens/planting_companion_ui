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
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      
      if (typeof exp !== 'number') return false;
      
      // Convert Unix timestamp to milliseconds and check expiration
      const expirationDate = new Date(exp * 1000);
      const bufferSeconds = 300; // 5-minute buffer for clock skew
      const now = new Date();
      
      return expirationDate.getTime() > now.getTime() + (bufferSeconds * 1000);
    } catch (e) {
      return false;
    }
  }

  getTokenExpiration(): Date | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch (e) {
      return null;
    }
  }
}
