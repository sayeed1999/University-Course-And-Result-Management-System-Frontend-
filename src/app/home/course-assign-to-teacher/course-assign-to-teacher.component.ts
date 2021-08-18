import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/Course.model';
import { Department } from 'src/app/models/Department.model';
import { Teacher } from 'src/app/models/Teacher.model';
import { CoursesService } from 'src/app/services/courses.service';
import { DepartmentService } from 'src/app/services/department.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


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
    private courseService: CoursesService,
    public dialog: MatDialog
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
      this.form.controls.departmentId.setValue(val.id);
      this.form.controls.teacherId.setValue(null);
      this.form.controls.courseCode.setValue(null);
      console.log(this.form)
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
    console.log('lala', this.form);
    // return;
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
          this.department.reset();
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