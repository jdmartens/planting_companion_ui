import { Component, inject } from '@angular/core';
import { UserStateService } from '../store/user-state.service';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ThemeSwitcherComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userStateService = inject(UserStateService); // Inject the UserStateService
}
