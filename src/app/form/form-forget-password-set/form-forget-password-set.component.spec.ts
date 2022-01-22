import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormForgetPasswordSetComponent } from './form-forget-password-set.component';

describe('FormForgetPasswordSetComponent', () => {
  let component: FormForgetPasswordSetComponent;
  let fixture: ComponentFixture<FormForgetPasswordSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormForgetPasswordSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormForgetPasswordSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
