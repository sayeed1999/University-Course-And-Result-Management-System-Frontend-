import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department } from 'src/app/models/Department.model';
import { Designation } from 'src/app/models/Designation.model';
import { DepartmentService } from 'src/app/services/department.service';
import { DesignationService } from 'src/app/services/designation.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {

  title = "Save Teacher"
  form = new FormGroup({
    name: new FormControl('', [ Validators.required ]),
    address: new FormControl('', [ Validators.required ]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    contact: new FormControl(0, [ Validators.required, Validators.min(100000), Validators.max(10000000000000) ]),
    designationId: new FormControl(0, [ Validators.required, Validators.min(1) ]),
    departmentId: new FormControl(0, [ Validators.required, Validators.min(1) ]),
    creditToBeTaken: new FormControl(0, [ Validators.required, Validators.min(0) ])
  });

  departments: Department[] = [];
  designations: Designation[] = [];

  constructor(
    private teacherService: TeacherService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchDesignations();
  }

  fetchDepartments() {
    this.departmentService.GetAll().subscribe(
      res => this.departments = res.data,
      error => {
        this.snackBar.open('Data fetching error! Please check your internet connection.', 'Close');
      }
    );
  }

  fetchDesignations() {
    this.designationService.GetAll().subscribe(
      res => this.designations = res.data,
      error => {
        this.snackBar.open('Data fetching error! Please check your internet connection.', 'Close');
        // this.snackBar.open(`Failed! ${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
      }
    );
  }

  debug = () => console.log(this.form);
    
  onSubmit() {
    // console.log(this.form);
    // i assume what data will come will match course model.
    var teacher = this.form.value;
    this.teacherService.Add(teacher).subscribe(
      res => {
        this.snackBar.open('Success! ' + res.message, 'Close');
        this.reset();
      },
      error => {
        this.snackBar.open('Failed! If your internet connection is okay, may be you are sending duplicate email address!', 'Close');
        // this.snackBar.open(`Failed! ${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
        this.reset();
      }
    );
  }


  
  reset() {
    this.form.reset();
  }

}
