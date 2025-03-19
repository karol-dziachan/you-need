import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompanyFormComponent } from './register-company-form.component';

describe('RegisterCompanyFormComponent', () => {
  let component: RegisterCompanyFormComponent;
  let fixture: ComponentFixture<RegisterCompanyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCompanyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
