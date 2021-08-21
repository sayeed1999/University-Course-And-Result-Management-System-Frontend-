import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClassScheduleComponent } from './view-class-schedule.component';

describe('ViewClassScheduleComponent', () => {
  let component: ViewClassScheduleComponent;
  let fixture: ComponentFixture<ViewClassScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClassScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClassScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
