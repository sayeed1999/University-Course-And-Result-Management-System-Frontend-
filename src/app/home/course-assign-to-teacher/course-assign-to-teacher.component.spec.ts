import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAssignToTeacherComponent } from './course-assign-to-teacher.component';

describe('CourseAssignToTeacherComponent', () => {
  let component: CourseAssignToTeacherComponent;
  let fixture: ComponentFixture<CourseAssignToTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseAssignToTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAssignToTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
