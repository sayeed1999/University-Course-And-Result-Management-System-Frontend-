import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassSchedule } from 'src/app/models/ClassSchedule.model';
import { Department } from 'src/app/models/Department.model';
import { CoursesService } from 'src/app/services/courses.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-view-class-schedule',
  templateUrl: './view-class-schedule.component.html',
  styleUrls: ['./view-class-schedule.component.css']
})
export class ViewClassScheduleComponent implements OnInit {

  title = "View Class Schedule and Room Allocation Information";
  departmentId = new FormControl(0);
  departments: Department[] = [];
  classSchedules: ClassSchedule[] = [];
  displayedColumns = [ 'code', 'name', 'schedule-info' ];

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
        this.snackbar.open(`Data fetching failed! Check your internet connection.`, 'Close');
      }
    );
  }

  fetchClassSchedule(departmentId: number) {
    this.courseService.GetClassScheduleAndRoomAllocationInfo(departmentId).subscribe(
      res => {
        this.classSchedules = res.data;
      },
      error => {
        this.snackbar.open(error.error.message ?? 'Check your internet connection.', 'Close');
      }
    );
  }

  onChange() {
    this.departmentId.valueChanges.subscribe(val => {
      if(val == 0) return;
      this.fetchClassSchedule(val);
    });
  }

  parseDate(date:any) : string {
    var temp = new Date(date);
    var hour = temp.getHours() + 6;
    var min = temp.getMinutes();
    if(hour <= 12) return hour + ':' + min + ' AM';
    return (hour-12) + ':' + min + ' PM';
  }

}
