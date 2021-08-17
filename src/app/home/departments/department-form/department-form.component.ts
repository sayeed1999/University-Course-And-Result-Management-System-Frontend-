import { Component, OnInit } from '@angular/core';
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
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    var department = new Department(0, this.code, this.name)
    console.log(department);
    this.departmentService.Add(department).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      },
      () => {
        // complete
        this.code = '';
        this.name = '';
      }
    );
  }

}
