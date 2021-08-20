import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department } from 'src/app/models/Department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {

  title = "Save Department";
  code: string = '';
  name: string = '';

  constructor(
    private departmentService: DepartmentService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form)
    var department = new Department(0, this.code, this.name)
    console.log(department);
    this.departmentService.Add(department).subscribe(
      res => {
        this.snackbar.open('Success! ' + res.message, 'Close');
        this.reset(form);
      },
      error => {
        this.snackbar.open('Failed! ' + error.message, 'Close');
        this.reset(form);
      }
    );
  }

  
  reset(form: NgForm) {
    form.reset();
  }
}
