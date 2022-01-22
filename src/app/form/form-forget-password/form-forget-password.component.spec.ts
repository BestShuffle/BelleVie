import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormForgetPasswordComponent } from './form-forget-password.component';

describe('FormForgetPasswordComponent', () => {
  let component: FormForgetPasswordComponent;
  let fixture: ComponentFixture<FormForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormForgetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
