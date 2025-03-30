import { Component, inject } from '@angular/core';
import { UserStateService } from '../store/user-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userStateService = inject(UserStateService); // Inject the UserStateService
}
