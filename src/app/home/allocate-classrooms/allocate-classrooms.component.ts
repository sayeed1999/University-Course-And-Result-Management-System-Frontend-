import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllocateClassroom } from 'src/app/models/AllocateClassroom.model';
import { Course } from 'src/app/models/Course.model';
import { Day } from 'src/app/models/Day.model';
import { Department } from 'src/app/models/Department.model';
import { Room } from 'src/app/models/Room.model';
import { CoursesService } from 'src/app/services/courses.service';
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
    courseId: new FormControl(0, [Validators.required,Validators.min(1)]),
    roomId: new FormControl(0, [Validators.required,Validators.min(1)]),
    dayId: new FormControl(0, [Validators.required,Validators.min(1)]),
    from: new FormControl(new Date(), Validators.required),
    to: new FormControl(new Date(), Validators.required)
  });

  departmentFetching = false; courseFetching = false; roomFetching = false; dayFetching = false;
  
  constructor(
    private departmentService: DepartmentService,
    private courseService: CoursesService,
    private roomsService: RoomsService,
    private daysService: DaysService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchDepartments();
    this.onChanges();
    this.fetchRooms();
    this.fetchDays();

    this.form.controls.courseId.valueChanges.subscribe(val => {
      if(val == "null") this.form.controls.courseId.setValue(null);
    })
  }

  fetchDepartments() {
    this.departmentFetching = true;
    this.departmentService.GetAll().subscribe(
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
      this.form.controls.courseId.setValue(0);
      if(val == undefined || val == null ||  val == 0) return;
      this.fetchCourses(val);
    });
  }

  fetchCourses(departmentId: number) {
    this.courseFetching = true;
    this.courseService.GetCoursesByDepartment(departmentId).subscribe(
      res => {
        this.courses = res.data;
        this.courseFetching = false;
      },
      error => {
        this.snackbar.open(`Failed! ${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
        this.courseFetching = false;
      }
    );
  }

  onSubmit() {
    
    var tmp: AllocateClassroom = new AllocateClassroom(
      0,
      this.form.value.roomId,
      this.form.value.departmentId,
      this.form.value.courseId,
      this.form.value.dayId,
      0,
      0
    )
    
    let temp: Date = this.form.value.from;
    let tempStr = `${temp.getHours()}.${temp.getMinutes()}`;
    tmp.from = Number.parseFloat(tempStr);
    
    temp = this.form.value.to;
    tempStr = `${temp.getHours()}.${temp.getMinutes()}`;
    tmp.to = Number.parseFloat(tempStr);
    
    // console.log(tmp); return;

    this.roomsService.AllocateClassRoom(tmp).subscribe(
      res => {
        this.snackbar.open(`Success! ${res.message}`, 'Close');
        this.reset();
      },
      error => {
        this.snackbar.open(error.error.message ?? 'Please check your internet connection.', 'Close');
      }
    );
  }

  reset() {
    this.form.reset();
    this.form.controls.from.setValue(new Date());
    this.form.controls.to.setValue(new Date());
  }

}
