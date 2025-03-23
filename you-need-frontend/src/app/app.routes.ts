import { Routes } from '@angular/router';
import {RegisterCompanyComponent} from './register-company/register-company.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register-company', component: RegisterCompanyComponent},
  {path: 'login', component: LoginComponent},
];
