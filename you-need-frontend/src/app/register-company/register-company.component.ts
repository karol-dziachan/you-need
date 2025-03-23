import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputGroupModule } from 'primeng/inputgroup';
import { StepperModule } from 'primeng/stepper';
import {
  RegisterOwnerComponent,
  ComponentData as OwnerComponentData,
  Errors
} from './register-owner/register-owner.component';
import {ComponentData as CompanyComponentData} from './register-company-form/register-company-form.component';
import {RegisterCompanyFormComponent} from './register-company-form/register-company-form.component';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
    StepperModule,
    InputGroupModule,
    RegisterOwnerComponent,
    RegisterCompanyFormComponent
  ],
  providers: [ MessageService ],
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.scss'
})
export class RegisterCompanyComponent {

  subFormsData: {
    owner?: {
      componentData: OwnerComponentData;
      valid: boolean;
      errors: Errors | null;
    }
    company?: {
      componentData: CompanyComponentData;
      valid: boolean;
      errors: Errors | null;
    },
  } = {};

  registerRequest: {
    owner?: OwnerComponentData;
    company?: CompanyComponentData;
  } = {};

  registrationAvailable: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  processOwnerData($event: {componentData: OwnerComponentData, valid: boolean, errors: Errors | null}): void {
    this.subFormsData.owner = $event;
  }

  processCompanyData($event: {componentData: CompanyComponentData, valid: boolean, errors: Errors | null}): void {
    this.subFormsData.company = $event;
  }

  processOwnerDataForRegistration($event: OwnerComponentData | undefined) {
    this.registerRequest.owner = $event;
    this.registrationAvailable = !!(this.registerRequest.owner && this.registerRequest.company);
  }

  processCompanyDataForRegistration($event: CompanyComponentData | undefined) {
    this.registerRequest.company = $event;
    this.registrationAvailable = !!(this.registerRequest.owner && this.registerRequest.company);
  }

  registerCompany(): void {
    this.http.post(`${environment.apiUrl}/company`, this.registerRequest).subscribe(() => {
      this.router.navigate([ '/' ]);
    });
  }


}
