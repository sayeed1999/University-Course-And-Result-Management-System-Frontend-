import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/Course.model';
import { Department } from 'src/app/models/Department.model';
import { Teacher } from 'src/app/models/Teacher.model';
import { CoursesService } from 'src/app/services/courses.service';
import { DepartmentService } from 'src/app/services/department.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TeacherService } from 'src/app/services/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AskDialogComponent } from 'src/app/shared/ask-dialog/ask-dialog.component';


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
  teacher = new FormControl();
  course = new FormControl();

  form = new FormGroup({
    departmentId: new FormControl(0, [Validators.required,Validators.min(1)]),
    teacherId: new FormControl(0, [Validators.required,Validators.min(1)]),
    creditToBeTaken: new FormControl(),
    remainingCredit: new FormControl(),
    courseId: new FormControl(0, [Validators.required, Validators.min(1)]),
    courseName: new FormControl(),
    courseCredit: new FormControl(),
  });

  fetchingDepartments = false;
  fetchingTeachers = false;
  fetchingCourses = false;

  constructor(
    private departmentService: DepartmentService,
    private teacherService: TeacherService,
    private courseService: CoursesService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchDepartments();
    this.onChanges();
  }

  fetchDepartments() {
    this.fetchingDepartments = true;
    this.departmentService.GetAll().subscribe(
      res => {
        this.departments = res.data;
        this.fetchingDepartments = false;
      },
      error => {
        this.snackbar.open(`Failed!\n${error.error.message ?? "Please check your internet connection."}`, 'Close');
        this.fetchingDepartments = false;
      }
    );
  }
  fetchCourses(departmentId: number) {
    this.fetchingCourses = true;
    this.courseService.GetCoursesByDepartment(departmentId).subscribe(
      res => {
        this.courses = res.data;
        this.fetchingCourses = false;
      },
      error => {
        this.snackbar.open(`Failed!\n${error.error.message ?? "Please check your internet connection."}`, 'Close');
        this.fetchingCourses = false;
      }
    );
  }
  fetchTeachers(departmentId: number) {
    this.fetchingTeachers = true;
    this.teacherService.GetTeachersByDepartment(departmentId).subscribe(
      res => {
        this.teachers = res.data;
        this.fetchingTeachers = false;
      },
      error => {
        this.snackbar.open(`Failed!\n${error.error.message ?? "Please check your internet connection."}`, 'Close');
        this.fetchingTeachers = false;
      }
    );
  }

  onChanges(): void {

    this.form.get('departmentId')?.valueChanges.subscribe(val => 
    {
      this.form.controls.teacherId.setValue(0);
      this.form.controls.courseId.setValue(0);
      this.teachers = [];
      this.courses = [];

      if(val == undefined || val == null || val == 0) return;

      this.fetchCourses(val);
      this.fetchTeachers(val);
    });

    this.form.controls.teacherId.valueChanges.subscribe(
      val => {
      const teacher = this.teachers.find(x => x.id == val);
      this.form.controls.creditToBeTaken.setValue(teacher?.creditToBeTaken ?? null);
      this.form.controls.remainingCredit.setValue(teacher?.remainingCredit ?? null);
    });

    this.form.controls.courseId.valueChanges.subscribe(
      val => {
      const course = this.courses.find(x => x.id == val);
      this.form.controls.courseName.setValue(course?.name ?? null);
      this.form.controls.courseCredit.setValue(course?.credit ?? null);
    });
  }
  onSubmit() {
    this.courseService.courseAssignToTeacher(+this.form.value.departmentId, +this.form.value.teacherId, this.form.value.courseId)
      .subscribe(
        res => {
          this.snackbar.open(`Success! ${res.message}`, 'Close');
          this.reset();
        },
        (error:HttpErrorResponse) => {
          this.snackbar.open(error.error.message ?? 'Check your internet connection.', 'Close');
        }
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AskDialogComponent, {
      width: '576px',
      data: {
        message: 'Are you sure you want to proceed?',
        subMessage: 'The teacher will have so many courses hard to manage..'
      }
    });

    dialogRef.afterClosed().subscribe(permission => {
      if(permission == true) {
        this.onSubmit();
      } else {
        this.snackbar.open(`Cancelled!`, 'Close');
      }
    });
  }

  reset() {
    this.course.reset();
    this.teacher.reset();
    this.department.reset();
    this.form.reset();
  }
}