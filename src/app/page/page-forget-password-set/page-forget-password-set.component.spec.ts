import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageForgetPasswordSetComponent } from './page-forget-password-set.component';

describe('PageForgetPasswordSetComponent', () => {
  let component: PageForgetPasswordSetComponent;
  let fixture: ComponentFixture<PageForgetPasswordSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageForgetPasswordSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageForgetPasswordSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
