import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department } from 'src/app/models/Department.model';
import { Student } from 'src/app/models/Student.model';
import { DepartmentService } from 'src/app/services/department.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {

  title = "Student Registration";

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
    date: new FormControl(new Date(), Validators.required),
    address: new FormControl('', [ Validators.required, Validators.minLength(6)]),
    departmentId: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  departments: Department[] = [];

  constructor(
    private studentService: StudentService,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchDepartments();
  }

  fetchDepartments() {
    this.departmentService.GetAll().subscribe(
      res => this.departments = res.data,
      error => {
        this.snackBar.open(`Data fetching error! Please check your internet connection.`, 'Close');
      }
    );
  }

  onSubmit() {
    this.studentService.Add(this.form.value).subscribe(
      res => {
        this.reset();
        // console.log(res.data);
        this.openDialog(res.data);
      },
      error => {
        this.snackBar.open(error.error.message ?? 'Check your internet connection.', 'Close');
      }
    );
  }

  openDialog(student: Student): void {
    this.dialog.open(RegisteredStudentDialog, {
      width: '400px',
      data: student
    });
  }

  reset() {
    this.form.reset();
  }
}



@Component({
  selector: 'registered-student-dialog',
  templateUrl: 'registered-student-dialog.component.html',
  styles: [`
    .col-4 {
      font-weight: bold;
    }
    .row {
      margin: 4px 0;
    }
  `],
})
export class RegisteredStudentDialog {

  constructor(
    public dialogRef: MatDialogRef<RegisteredStudentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      // console.log(data);
    }
    
  onNoClick(): void {
    this.dialogRef.close();
  }

}