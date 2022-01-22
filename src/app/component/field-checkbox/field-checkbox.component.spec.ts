import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCheckboxComponent } from './field-checkbox.component';

describe('FieldCheckboxComponent', () => {
  let component: FieldCheckboxComponent;
  let fixture: ComponentFixture<FieldCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
