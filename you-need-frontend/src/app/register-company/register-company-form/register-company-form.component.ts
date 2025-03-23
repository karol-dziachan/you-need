import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FloatLabel} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import { Errors } from '../register-owner/register-owner.component';
import {map, Observable, of, startWith, Subscription, tap} from 'rxjs';
import {NgIf} from '@angular/common';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-register-company-form',
  imports: [
    FloatLabel,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
    NgIf,
    Button
  ],
  templateUrl: './register-company-form.component.html',
  styleUrl: './register-company-form.component.scss'
})
export class RegisterCompanyFormComponent implements OnInit, OnDestroy {
  @Input()
  callbackFn: (nextsecNumber: number) => void = () => {
  };

  @Input()
  initialComponentData?: ComponentData;

  @Input()
  currentSectionNumber: number = 0;

  @Output()
  componentDataEvent: EventEmitter<{ componentData: ComponentData, valid: boolean, errors: Errors | null }> = new EventEmitter();

  @Output()
  validDataEvent: EventEmitter<ComponentData | undefined> = new EventEmitter();

  change$?: Subscription;


  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      // Company details
      name: [ '', [ Validators.required ] ],
      nip: [ '', [ Validators.required, Validators.minLength(10), Validators.maxLength(10) ] ],
      regon: [ '', [ Validators.required, Validators.minLength(9), Validators.maxLength(14) ] ],
      street: [ '' ],
      building: [ '', [ Validators.required ] ],
      apartment: [ '', ],
      city: [ '', [ Validators.required ] ],
      state: [ '', [ Validators.required ] ],
      country: [ '', [ Validators.required ] ],
      postalCode: [ '', [ Validators.required ] ],
      phoneNumber: [ '', [ Validators.required ] ],
      email: [ '', [ Validators.required, Validators.email ] ],
    });
  }

  ngOnInit(): void {
    if (this.initialComponentData) {
      this.registerForm.setValue(this.initialComponentData);
      Object.keys(this.registerForm.controls).forEach(control => {
        this.registerForm.controls[control].markAsDirty();
        this.registerForm.controls[control].markAsTouched();
      });
    }

    this.change$ = this.registerForm.valueChanges.pipe(
      startWith(this.registerForm.valid),
      tap(() => {
        console.log("shouldEmit");
        if (this.registerForm.valid) {
          console.log("should emit", this.registerForm.getRawValue());
          this.validDataEvent.emit(this.registerForm.getRawValue());
        } else {
          this.validDataEvent.emit(undefined);
        }
      }),
      map(() => this.registerForm.valid)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.componentDataEvent.emit({
      componentData: this.registerForm.getRawValue(),
      valid: this.registerForm.valid,
      errors: Object.keys(this.registerForm.controls).map(key => {return {key, errors: this.registerForm.controls[key].errors }; }) as Errors });
    this.change$?.unsubscribe();
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

export interface ComponentData {
  name: string;
  nip: string;
  regon: string;
  street: string;
  building: string;
  apartment: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
}
