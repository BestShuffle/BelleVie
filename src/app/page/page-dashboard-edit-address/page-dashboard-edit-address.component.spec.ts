import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDashboardEditAddressComponent } from './page-dashboard-edit-address.component';

describe('PageDashboardEditAddressComponent', () => {
  let component: PageDashboardEditAddressComponent;
  let fixture: ComponentFixture<PageDashboardEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDashboardEditAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDashboardEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
