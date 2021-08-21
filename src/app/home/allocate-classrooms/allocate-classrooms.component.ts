import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllocateClassroom } from 'src/app/models/AllocateClassroom.model';
import { Course } from 'src/app/models/Course.model';
import { Day } from 'src/app/models/Day.model';
import { Department } from 'src/app/models/Department.model';
import { Room } from 'src/app/models/Room.model';
import { DaysService } from 'src/app/services/days.service';
import { DepartmentService } from 'src/app/services/department.service';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'allocate-classrooms',
  templateUrl: './allocate-classrooms.component.html',
  styleUrls: ['./allocate-classrooms.component.css']
})
export class AllocateClassroomsComponent implements OnInit {

  title = "Allocate Classrooms";
  departments: Department[] = [];
  courses: Course[] = [];
  rooms: Room[] = [];
  days: Day[] = [];

  form = new FormGroup({
    departmentId : new FormControl(0, [Validators.required,Validators.min(1)]),
    courseCode: new FormControl(null, Validators.required),
    roomId: new FormControl(null, Validators.required),
    dayId: new FormControl(null, Validators.required),
    from: new FormControl(new Date(), Validators.required),
    to: new FormControl(new Date(), Validators.required)
  });

  departmentFetching = false; courseFetching = false; roomFetching = false; dayFetching = false;
  
  constructor(
    private departmentService: DepartmentService,
    private roomsService: RoomsService,
    private daysService: DaysService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchDepartmentsWithCourses();
    this.onChanges();
    this.fetchRooms();
    this.fetchDays();
  }

  fetchDepartmentsWithCourses() {
    this.departmentFetching = true;
    this.departmentService.getAllDepartmentsWithCourses().subscribe(
      res => {
        this.departments = res.data;
        this.departmentFetching = false;
      },
      error => {
        this.snackbar.open(`Failed! ${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
        this.departmentFetching = false;
      }
    );
  }

  fetchRooms() {
    this.roomFetching = true;
    this.roomsService.GetAll().subscribe(
      res => {
        this.rooms = res.data;
        this.roomFetching = false;
      },
      error => {
        this.snackbar.open(`Failed! ${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
        this.roomFetching = false;
      }
    );
  }

  fetchDays() {
    this.dayFetching = true;
    this.daysService.GetAll().subscribe(
      res => {
        this.days = res.data;
        this.dayFetching = false;
      },
      error => {
        this.snackbar.open(`Failed! ${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
        this.dayFetching = false;
      }
    );
  }

  onChanges() {
    this.form.controls.departmentId.valueChanges.subscribe(val => {
      this.courses = [];
      if(val == undefined || val == null ||  val == 0) return;
      const department = this.departments.find(x => x.id == val);
      this.courses = department?.courses ?? [];
    });
  }

  onSubmit() {
    // console.log(this.form.value);

    if(new Date(this.form.value.from) >= new Date(this.form.value.to)) {
      alert("Class duration cannot be 0 or less than 0 minutes!");
      return;
    }
    //post:
    this.roomsService.AllocateClassRoom(this.form.value).subscribe(
      res => {
        this.snackbar.open(`Success! ${res.message}`, 'Close');
        this.reset();
      },
      error => {
        this.snackbar.open(`Failed! ${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
        this.reset();
      }
    );
  }

  reset() {
    this.form.reset();
    this.form.controls.from.setValue(new Date());
    this.form.controls.to.setValue(new Date());
  }

}
