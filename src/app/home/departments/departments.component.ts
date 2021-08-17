import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/Department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  
  displayedColumns: string[] = [ 'code', 'name' ];
  dataSource: Department[] = [];

  constructor(
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll() {
    this.departmentService.GetAll().subscribe(
      res => {
        console.log(res);
        this.dataSource = res.data;
        console.log("data", this.dataSource);
      },
      error => {
        console.log(error);
      }
    );
  }

}
