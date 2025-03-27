import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserMgmtComponent } from './user-mgmt/user-mgmt.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: UserMgmtComponent }
];
