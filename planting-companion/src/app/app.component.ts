import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { TokenService } from './core/token.service';
import { UserStateService } from './store/user-state.service';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private readonly userStateService = inject(UserStateService);
  private readonly tokenService = inject(TokenService);
  private readonly themeService = inject(ThemeService);

  constructor(authService: AuthService) {
    authService.startSessionMonitoring();
  }

  title = 'planting-companion';

  ngOnInit() {
    this.initializeUserFromToken();
    this.themeService.setTheme(this.themeService.getCurrentTheme());
  }


  private initializeUserFromToken(): void {
    if (this.tokenService.isTokenValid()) {
      const email = this.tokenService.getEmail();
      const fullName = this.tokenService.getFullName();
      
      if (email && fullName) {
        this.userStateService.setUser(fullName, email);
      } else {
        this.userStateService.clearUser();
      }
    } else {
      this.userStateService.clearUser();
    }
  }
}
