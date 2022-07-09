import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDashboardComponent } from './car-dashboard.component';

describe('CarDashboardComponent', () => {
  let component: CarDashboardComponent;
  let fixture: ComponentFixture<CarDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
