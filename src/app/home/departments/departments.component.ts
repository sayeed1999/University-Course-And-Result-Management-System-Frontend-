import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private departmentService: DepartmentService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll() {
    this.departmentService.GetAll().subscribe(
      res => {
        this.dataSource = res.data;
      },
      error => {
        this.snackbar.open('Data fetching failed! Check your internet connection', 'Çlose');
      }
    );
  }

}
