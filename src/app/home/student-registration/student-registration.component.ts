import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/models/Department.model';
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
  ) { }

  ngOnInit(): void {
    this.fetchDepartments();
  }

  fetchDepartments() {
    this.departmentService.GetAll().subscribe(
      res => this.departments = res.data,
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.studentService.Add(this.form.value).subscribe(
      res => alert("Successfully registered"),
      error => alert("Some error occured. Don't provide wrong data or attempt duplicate registration"),
      () => this.form.reset()
    );
  }
}