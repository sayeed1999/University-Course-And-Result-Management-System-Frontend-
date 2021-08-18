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

  form = new FormGroup({
    departmentId: new FormControl(0, Validators.required),
    teacherId: new FormControl('', Validators.required),
    courseCode: new FormControl('', Validators.required),
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
    this.form.get('departmentId')?.valueChanges.subscribe(val => {
      const dept = this.departments.find(x => x.id == val);
      console.log(dept);
      this.courses = dept?.courses ?? [];
      this.teachers = dept?.teachers ?? [];
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
