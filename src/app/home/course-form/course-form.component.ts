import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department } from 'src/app/models/Department.model';
import { Semister } from 'src/app/models/Semister.model';
import { CoursesService } from 'src/app/services/courses.service';
import { DepartmentService } from 'src/app/services/department.service';
import { SemistersService } from 'src/app/services/semisters.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  title = "Save Course"
  form = new FormGroup({
    code: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
    name: new FormControl('', Validators.required),
    credit: new FormControl('', [ Validators.required, Validators.min(0.5), Validators.max(5) ]),
    description: new FormControl(''),
    departmentId: new FormControl(null, Validators.required),
    semisterId: new FormControl(null, Validators.required)
  });

  departments: Department[] = [];
  semisters: Semister[] = [];

  constructor(
    private coursesService: CoursesService,
    private semisterService: SemistersService,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchSemisters();
  }

  fetchDepartments() {
    this.departmentService.GetAll().subscribe(
      res => this.departments = res.data,
      error => this.snackBar.open('Data fetching error! Please check your internet connection.', 'Close')
      );
  }

  fetchSemisters() {
    this.semisterService.GetAll().subscribe(
      res => this.semisters = res.data,
      error => this.snackBar.open('Data fetching error! Please check your internet connection.', 'Close')
      );
  }
    
  onSubmit() {
    var course = this.form.value;
    this.coursesService.Add(course).subscribe(
      res => {
        this.snackBar.open('Success! ' + res.message, 'Close');
        this.reset();
      },
      error => {
        this.snackBar.open(error.error.message ?? 'Check your internet connection', 'Close');
      }
    );
  }


  reset() {
    this.form.reset();
  }

}
