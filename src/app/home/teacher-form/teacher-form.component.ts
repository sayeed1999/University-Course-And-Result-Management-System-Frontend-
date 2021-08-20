import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    contact: new FormControl(0, [ Validators.required, Validators.min(1), Validators.minLength(6), Validators.maxLength(14) ]),
    designationId: new FormControl(0, Validators.required),
    departmentId: new FormControl(0, Validators.required),
    creditToBeTaken: new FormControl(0, [ Validators.required, Validators.min(0) ])
  });

  departments: Department[] = [];
  designations: Designation[] = [];

  constructor(
    private teacherService: TeacherService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
  ) { }

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchDesignations();
  }

  fetchDepartments() {
    this.departmentService.GetAll().subscribe(
      res => this.departments = res.data,
      error => {
        console.log(error);
      }
    );
  }

  fetchDesignations() {
    this.designationService.GetAll().subscribe(
      res => this.designations = res.data,
      error => {
        console.log(error);
      }
    );
  }
    
  onSubmit() {
    // console.log(this.form);
    // i assume what data will come will match course model.
    var teacher = this.form.value;
    this.teacherService.Add(teacher).subscribe(
      res => {
        alert("Successfully saved!");
      },
      error => {
        alert("Error Occurred. Try providing the right data");
      },
      () => {
        // complete
        this.form.reset();
      }
    );
  }

}
