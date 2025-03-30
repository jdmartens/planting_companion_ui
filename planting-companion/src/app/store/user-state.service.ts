import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  // Signals to track user attributes
  fullName = signal<string | null>(null);
  email = signal<string | null>(null);

  // Set user attributes when logging in
  setUser(fullName: string, email: string): void {
    this.fullName.set(fullName);
    this.email.set(email);
  }

  // Clear user attributes when logging out
  clearUser(): void {
    this.fullName.set(null);
    this.email.set(null);
  }
}