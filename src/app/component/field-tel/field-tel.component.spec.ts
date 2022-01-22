import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTelComponent } from './field-tel.component';

describe('FieldTelComponent', () => {
  let component: FieldTelComponent;
  let fixture: ComponentFixture<FieldTelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldTelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldTelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
