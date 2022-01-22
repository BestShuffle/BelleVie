import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCGVComponent } from './page-cgv.component';

describe('PageCGVComponent', () => {
  let component: PageCGVComponent;
  let fixture: ComponentFixture<PageCGVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCGVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCGVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
