import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDashboardEditPasswordComponent } from './page-dashboard-edit-password.component';

describe('PageDashboardEditPasswordComponent', () => {
  let component: PageDashboardEditPasswordComponent;
  let fixture: ComponentFixture<PageDashboardEditPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDashboardEditPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDashboardEditPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
