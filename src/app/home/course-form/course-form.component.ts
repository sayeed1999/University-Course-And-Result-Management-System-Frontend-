import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/Course.model';
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
    code: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(7) ]),
    name: new FormControl('', Validators.required),
    credit: new FormControl('', [ Validators.required, Validators.min(0.5), Validators.max(5) ]),
    description: new FormControl('', [ Validators.required, Validators.minLength(30) ]),
    departmentId: new FormControl(null, Validators.required),
    semisterId: new FormControl(null, Validators.required)
  });

  departments: Department[] = [ new Department(1,'asd','asdsad'), new Department(2, 'zxc', 'zxccxz') ];
  semisters: Semister[] = [ new Semister(7, 'seventh') ];

  constructor(
    private coursesService: CoursesService,
    private semisterService: SemistersService,
    private departmentService: DepartmentService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchSemisters();
  }

  fetchDepartments() {
    this.departmentService.GetAll().subscribe(
      res => this.departments = res.data,
      error => this.snackbar.open('Failed! ' + error.message, 'Close'),
    );
  }

  fetchSemisters() {
    this.semisterService.GetAll().subscribe(
      res => this.semisters = res.data,
      error => this.snackbar.open('Failed! ' + error.message, 'Close')
    );
  }
    
  onSubmit() {
    var course = this.form.value;
    // console.log(course);
    this.coursesService.Add(course).subscribe(
      res => {
        this.router.navigate(['../']);
        this.snackbar.open('Success! ' + res.message, 'Close');
        this.reset();
      },
      error => {
        this.snackbar.open('Failed! ' + error.message, 'Close');
        // this.reset();
      }
    );
  }


  reset() {
    this.form.reset();
    // this.form.markAsPristine();
    // this.form.markAsUntouched();
    // console.log(this.form.value);
  }

}
