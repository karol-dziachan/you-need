import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FloatLabel} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';

@Component({
  selector: 'app-register-company-form',
  imports: [
    FloatLabel,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule
  ],
  templateUrl: './register-company-form.component.html',
  styleUrl: './register-company-form.component.scss'
})
export class RegisterCompanyFormComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      // Company details
      companyName: [ '', [ Validators.required ] ],
      nip: [ '', [ Validators.required, Validators.minLength(10), Validators.maxLength(10) ] ],
      regon: [ '', [ Validators.required, Validators.minLength(9), Validators.maxLength(14) ] ],
      street: [ '', [ Validators.required ] ],
      building: [ '', [ Validators.required ] ],
      apartment: [ '' ],
      city: [ '', [ Validators.required ] ],
      state: [ '', [ Validators.required ] ],
      country: [ '', [ Validators.required ] ],
      postalCode: [ '', [ Validators.required ] ],
      phoneNumber: [ '', [ Validators.required ] ],
      email: [ '', [ Validators.required, Validators.email ] ],

      // Owner details
      firstName: [ '', [ Validators.required ] ],
      lastName: [ '', [ Validators.required ] ],
      login: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required, Validators.minLength(8) ] ],
      confirmPassword: [ '', [ Validators.required ] ]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { 'mismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // TODO: Implement API call to register company and owner
      console.log(this.registerForm.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Company and owner registered successfully'
      });
      this.router.navigate([ '/login' ]);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields correctly'
      });
    }
  }
}
