import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/Course.model';
import { Department } from 'src/app/models/Department.model';
import { Teacher } from 'src/app/models/Teacher.model';
import { CoursesService } from 'src/app/services/courses.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'course-assign-to-teacher',
  templateUrl: './course-assign-to-teacher.component.html',
  styleUrls: ['./course-assign-to-teacher.component.css']
})
export class CourseAssignToTeacherComponent implements OnInit {

  title: string = "Course Assign To Teacher";
  departments: Department[] = [];
  teachers: Teacher[] = [];
  courses: Course[] = [];
  department = new FormControl();

  form = new FormGroup({
    departmentId: new FormControl(0, Validators.required),
    teacherId: new FormControl(0, [ Validators.required, Validators.min(1) ]),
    creditToBeTaken: new FormControl(''),
    remainingCredit: new FormControl(''),
    courseCode: new FormControl(null, Validators.required),
    courseName: new FormControl(''),
    courseCredit: new FormControl(''),
  });

  constructor(
    private departmentService: DepartmentService,
    private courseService: CoursesService
  ) { }

  ngOnInit(): void {
    this.fetchDepartmentsWithAll();
    this.onChanges();
  }

  fetchDepartmentsWithAll() {
    this.departmentService.getAllDepartmentsWithCoursesAndTeachers().subscribe(
      res => {
        this.departments = res.data;
        console.log(this.departments);
      },
      error => {
        console.log(error);
      }
    );
  }

  onChanges(): void {
    this.department.valueChanges.subscribe((val:Department) => {
      this.courses = val.courses ?? [];
      this.teachers = val.teachers ?? [];

      this.form.patchValue({
        departmentId: new FormControl(val.id, Validators.required),
        teacherId: new FormControl(0, [ Validators.required, Validators.min(1) ]),
        courseCode: new FormControl(null, [Validators.required]),
      })
    });

    this.form.get('teacherId')?.valueChanges.subscribe(val => {
      const teacher = this.teachers.find(x => x.id == val);
      this.form.controls.creditToBeTaken.setValue(teacher?.creditToBeTaken ?? '');
      this.form.controls.remainingCredit.setValue(teacher?.remainingCredit ?? '');
    });

    this.form.get('courseCode')?.valueChanges.subscribe(val => {
      const course = this.courses.find(x => x.code == val);
      this.form.controls.courseName.setValue(course?.name ?? '');
      this.form.controls.courseCredit.setValue(course?.credit ?? '');
    });
  }
  onSubmit() {
    console.log(this.form);
    this.courseService.courseAssignToTeacher(this.form.value.departmentId, this.form.value.teacherId, this.form.value.courseCode)
      .subscribe(
        res => {
          console.log(res.message);
        },
        error => {
          console.log(error);
        },
        () => {
          this.form.reset();
        }
      );
  }
}
