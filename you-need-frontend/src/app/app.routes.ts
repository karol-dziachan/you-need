import { Routes } from '@angular/router';
import {RegisterCompanyComponent} from './register-company/register-company.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register-company', component: RegisterCompanyComponent},
];
