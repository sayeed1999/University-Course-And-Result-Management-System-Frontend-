import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignAllCoursesComponent } from './unassign-all-courses.component';

describe('UnassignAllCoursesComponent', () => {
  let component: UnassignAllCoursesComponent;
  let fixture: ComponentFixture<UnassignAllCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignAllCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignAllCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
