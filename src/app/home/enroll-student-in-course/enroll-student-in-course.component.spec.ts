import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollStudentInCourseComponent } from './enroll-student-in-course.component';

describe('EnrollStudentInCourseComponent', () => {
  let component: EnrollStudentInCourseComponent;
  let fixture: ComponentFixture<EnrollStudentInCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollStudentInCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollStudentInCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
