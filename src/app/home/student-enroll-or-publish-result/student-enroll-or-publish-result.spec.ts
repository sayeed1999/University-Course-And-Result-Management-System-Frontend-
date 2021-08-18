import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollOrPublishResultComponent } from './student-enroll-or-publish-result.component';

describe('EnrollStudentInCourseComponent', () => {
  let component: StudentEnrollOrPublishResultComponent;
  let fixture: ComponentFixture<StudentEnrollOrPublishResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEnrollOrPublishResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrollOrPublishResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
