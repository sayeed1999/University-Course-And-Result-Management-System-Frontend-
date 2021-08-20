import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'src/app/models/Course.model';
import { Department } from 'src/app/models/Department.model';
import { CoursesService } from 'src/app/services/courses.service';
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
    private departmentService: DepartmentService,
    private courseService: CoursesService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchDepartments();
    this.onChange();
  }

  fetchDepartments() {
    this.departmentService.GetAll().subscribe(
      res => {
        this.departments = res.data;
      },
      error => {
        this.snackbar.open(`Failed!\n${error.message}`, 'Close');
      }
    );
  }
  fetchCourses(departmentId: number) {
    this.courseService.GetCoursesByDepartmentIncludingTeachers(departmentId).subscribe(
      res => {
        this.courses = res.data;
      },
      error => {
        this.snackbar.open(`Failed!\n${error.message}`, 'Close');
      }
    );
  }

  onChange() {
    this.department.valueChanges.subscribe((val) => {
      if(val == undefined) return;

      this.fetchCourses(val.id);
    });
  }
}
