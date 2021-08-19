import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Course } from 'src/app/models/Course.model';
import { Department } from 'src/app/models/Department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-course-statistics',
  templateUrl: './course-statistics.component.html',
  styleUrls: ['./course-statistics.component.css']
})
export class CourseStatisticsComponent implements OnInit {

  displayedColumns: string[] = [ 'code', 'name', 'semister', 'assignedTo' ];
  departments: Department[] = [];
  department = new FormControl();
  courses: Course[] = [];

  constructor(
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.fetchAll();
    this.onChange();
  }

  fetchAll() {
    this.departmentService.getAllDepartmentsWithCoursesAndTeachers().subscribe(
      res => {
        // console.log(res);
        this.departments = res.data;
        // console.log("data", this.departments);
      },
      error => {
        console.log(error);
      }
    );
  }

  onChange() {
    this.department.valueChanges.subscribe((val:Department) => {
      this.courses = val.courses ?? [];
    });
  }
}
