import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { Card } from 'primeng/card';
import { FloatLabelModule} from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { NgIf } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
  imports: [
    Card,
    FloatLabelModule,
    InputTextModule,
    Button,
    ReactiveFormsModule,
    Toast,
    NgIf
  ],
  providers: [ MessageService ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: [ '', [ Validators.required ] ],
      password: [ '', [ Validators.required, Validators.minLength(8) ] ]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sukces',
            detail: 'Zalogowano pomyślnie'
          });
          this.router.navigate([ '/' ]);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Błąd',
            detail: 'Nieprawidłowy email lub hasło'
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Błąd',
        detail: 'Proszę wypełnić wszystkie pola poprawnie'
      });
    }
  }
}
