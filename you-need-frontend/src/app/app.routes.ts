import { Routes } from '@angular/router';
import {RegisterCompanyComponent} from './register-company/register-company.component';
import {HomeComponent} from './home/home.component';
import {RegisterOwnerComponent} from './register-owner/register-owner.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register-company', component: RegisterCompanyComponent},
  {path: 'register-owner', component: RegisterOwnerComponent},

];
