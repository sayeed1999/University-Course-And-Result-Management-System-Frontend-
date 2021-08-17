import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    name: new FormControl('', [ Validators.required ]),
    credit: new FormControl('', [ Validators.required, Validators.min(0.5), Validators.max(5) ]),
    description: new FormControl('', [ Validators.required, Validators.minLength(50) ]),
    departmentId: new FormControl(0, Validators.required),
    semisterId: new FormControl(0, Validators.required)
  });

  departments: Department[] = [];
  semisters: Semister[] = [];

  constructor(
    private coursesService: CoursesService,
    private semisterService: SemistersService,
    private departmentService: DepartmentService,
  ) { }

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchSemisters();
  }

  fetchDepartments() {
    this.departmentService.GetAll().subscribe(
      res => this.departments = res.data,
      error => {
        console.log(error);
      }
    );
  }

  fetchSemisters() {
    this.semisterService.GetAll().subscribe(
      res => this.semisters = res.data,
      error => {
        console.log(error);
      }
    );
  }
    
  onSubmit() {
    // console.log(this.form);
    // i assume what data will come will match course model.
    var course = this.form.value;
    this.coursesService.Add(course).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      },
      () => {
        // complete
        this.form.reset();
      }
    );
  }

}
