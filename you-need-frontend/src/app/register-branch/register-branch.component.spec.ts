import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBranchComponent } from './register-branch.component';

describe('RegisterBranchComponent', () => {
  let component: RegisterBranchComponent;
  let fixture: ComponentFixture<RegisterBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterBranchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
