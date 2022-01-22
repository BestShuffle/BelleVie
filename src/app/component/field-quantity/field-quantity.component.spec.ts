import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldQuantityComponent } from './field-quantity.component';

describe('FieldQuantityComponent', () => {
  let component: FieldQuantityComponent;
  let fixture: ComponentFixture<FieldQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
