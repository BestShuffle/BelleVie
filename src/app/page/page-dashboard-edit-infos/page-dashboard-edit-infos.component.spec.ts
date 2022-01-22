import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDashboardEditInfosComponent } from './page-dashboard-edit-infos.component';

describe('PageDashboardEditInfosComponent', () => {
  let component: PageDashboardEditInfosComponent;
  let fixture: ComponentFixture<PageDashboardEditInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDashboardEditInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDashboardEditInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
