import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDashboardComponent } from './color-dashboard.component';

describe('ColorDashboardComponent', () => {
  let component: ColorDashboardComponent;
  let fixture: ComponentFixture<ColorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
