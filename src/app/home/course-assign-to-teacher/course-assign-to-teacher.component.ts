import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/Course.model';
import { Department } from 'src/app/models/Department.model';
import { Teacher } from 'src/app/models/Teacher.model';
import { CoursesService } from 'src/app/services/courses.service';
import { DepartmentService } from 'src/app/services/department.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TeacherService } from 'src/app/services/teacher.service';


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
    courseCode: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(7)]),
    courseName: new FormControl(),
    courseCredit: new FormControl(),
  });

  constructor(
    private departmentService: DepartmentService,
    private teacherService: TeacherService,
    private courseService: CoursesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchDepartments();
    this.onChanges();
  }

  fetchDepartments() {
    this.departmentService.GetAll().subscribe(
      res => {
        this.departments = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }
  fetchCourses(departmentId: number) {
    this.courseService.GetCoursesByDepartment(departmentId).subscribe(
      res => {
        this.courses = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }
  fetchTeachers(departmentId: number) {
    this.teacherService.GetTeachersByDepartment(departmentId).subscribe(
      res => {
        this.teachers = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onChanges(): void {
    this.department.valueChanges.subscribe(val => 
    {  
      if(val == undefined) return;

      this.form.controls.departmentId.setValue(val.id);
      this.fetchCourses(val.id);
      this.fetchTeachers(val.id);
      this.form.controls.teacherId.setValue(0);
      this.form.controls.courseCode.setValue('');
      // console.log(this.form)
    });

    this.teacher.valueChanges.subscribe(
      val => {
      if(val == undefined) return;

      this.form.controls.teacherId.setValue(val.id);
      this.form.controls.creditToBeTaken.setValue(val.creditToBeTaken);
      this.form.controls.remainingCredit.setValue(val.remainingCredit);
      console.log(this.form)
    });

    this.course.valueChanges.subscribe(
      (val) => {
      if(val == undefined) return;

      this.form.controls.courseCode.setValue(val.code);
      this.form.controls.courseName.setValue(val.name);
      this.form.controls.courseCredit.setValue(val.credit);
      console.log(this.form)
    });
  }
  onSubmit() {
    this.courseService.courseAssignToTeacher(this.form.value.departmentId, this.form.value.teacherId, this.form.value.courseCode)
      .subscribe(
        res => {
          this.reset();
        },
        error => {
          console.log(error);
          this.reset();
        }
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(permission => {
      if(permission == true) {
        this.onSubmit();
      } else {
        this.form.reset();
        this.department.reset();
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



@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
})
export class ConfirmationDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    
  onNoClick(): void {
    this.dialogRef.close();
  }

}