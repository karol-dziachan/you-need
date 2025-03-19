import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {InputGroupModule} from 'primeng/inputgroup';
import {FloatLabel} from 'primeng/floatlabel';

@Component({
  selector: 'app-register-owner',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FloatLabel,
    InputGroupModule
  ],
  providers: [ MessageService ],
  templateUrl: './register-owner.component.html',
  styleUrl: './register-owner.component.scss'
})
export class RegisterOwnerComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      firstName: [ '', [ Validators.required ] ],
      lastName: [ '', [ Validators.required ] ],
      login: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required, Validators.minLength(8) ] ],
      confirmPassword: [ '', [ Validators.required ] ]
    }, { validators: [ this.passwordMatchValidator ] } as AbstractControlOptions);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { 'mismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // TODO: Implement API call to register owner
      console.log(this.registerForm.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Owner registered successfully'
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
