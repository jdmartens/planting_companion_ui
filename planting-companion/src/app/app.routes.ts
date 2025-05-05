import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserMgmtComponent } from './user-mgmt/user-mgmt.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { PlantMgmtComponent } from './plant-mgmt/plant-mgmt.component';
import { PlantDetailsComponent } from './plant-details/plant-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'settings', component: UserSettingsComponent },
  { path: 'admin', component: UserMgmtComponent },
  { path: 'plants', component: PlantMgmtComponent },
  { path: 'plants/:uid', component: PlantDetailsComponent },
];
