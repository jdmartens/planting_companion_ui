import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserMgmtComponent } from './user-mgmt/user-mgmt.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'admin', component: UserMgmtComponent }
];
