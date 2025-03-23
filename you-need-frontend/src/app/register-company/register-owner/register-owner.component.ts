import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
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
import {map, Observable, of, startWith, tap} from 'rxjs';

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
export class RegisterOwnerComponent implements OnInit, OnDestroy {

  @Input()
  callbackFn: (nextsecNumber: number) => void = () => {
  };
  @Input()
  currentSectionNumber: number = 0;

  @Input()
  initialComponentData: ComponentData | undefined;

  @Output()
  componentDataEvent: EventEmitter<{ componentData: ComponentData, valid: boolean, errors: Errors | null }> = new EventEmitter();

  @Output()
  validDataEvent: EventEmitter<ComponentData | undefined> = new EventEmitter();

  nextEnabled$: Observable<boolean> = of(false);

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      firstName: [ null, [ Validators.required, Validators.minLength(2) ] ],
      lastName: [ null, [ Validators.required, Validators.minLength(2) ] ],
      login: [ null, [ Validators.required, Validators.minLength(8) ] ],
      password: [ null, [ Validators.required, Validators.minLength(8) ] ],
      confirmPassword: [ null, [ Validators.required, Validators.minLength(8) ] ]
    }, {validators: [ this.passwordMatchValidator ]} as AbstractControlOptions);
  }

  ngOnDestroy(): void {
    this.componentDataEvent.emit({
      componentData: this.registerForm.getRawValue(),
      valid: this.registerForm.valid,
      errors: Object.keys(this.registerForm.controls).map(key => {return {key, errors: this.registerForm.controls[key].errors }; }) as Errors });
  }

  ngOnInit() {
    if (this.initialComponentData) {
      this.registerForm.setValue(this.initialComponentData);
      Object.keys(this.registerForm.controls).forEach(control => {
        this.registerForm.controls[control].markAsDirty();
        this.registerForm.controls[control].markAsTouched();
      });
    }

    this.nextEnabled$ = this.registerForm.valueChanges.pipe(
      startWith(this.registerForm.valid),
      tap(() => {
        if (this.registerForm.valid) {
          console.log("should emit", this.registerForm.getRawValue());
          this.validDataEvent.emit(this.registerForm.getRawValue());
        } else {
          this.validDataEvent.emit(undefined);
        }
      }),
      map(() => this.registerForm.valid)
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : {'mismatch': true};
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // TODO: Implement API call to register owner
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

export type Errors = {
  key: string;
  errors: ValidationErrors;
}[]

export interface ComponentData {
  firstName?: string;
  lastName?: string;
  login?: string;
  password?: string;
  confirmPassword?: string;
}
