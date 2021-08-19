import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
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
  // from: any;
  // to: any;
  departments: Department[] = [];
  department = new FormControl();
  courses: Course[] = [];
  rooms: Room[] = [];
  days: Day[] = [];
  room = new FormControl();
  day = new FormControl();

  form = new FormGroup({
    departmentId : new FormControl(0, [Validators.required,Validators.min(1)]),
    courseCode: new FormControl('', Validators.required),
    roomId: new FormControl('', Validators.required),
    dayId: new FormControl('', Validators.required),
    from: new FormControl(new Date(), Validators.required),
    to: new FormControl(new Date(), Validators.required)
  });
  
  constructor(
    private departmentService: DepartmentService,
    private roomsService: RoomsService,
    private daysService: DaysService
  ) { }

  ngOnInit(): void {
    this.fetchDepartmentsWithCourses();
    this.onChanges();
    this.fetchRooms();
    this.fetchDays();
  }

  fetchDepartmentsWithCourses() {
    this.departmentService.getAllDepartmentsWithCourses().subscribe(
      res => {
        this.departments = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchRooms() {
    this.roomsService.GetAll().subscribe(
      res => {
        this.rooms = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchDays() {
    this.daysService.GetAll().subscribe(
      res => {
        this.days = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onChanges() {
    this.department.valueChanges.subscribe((val:Department) => {
      this.form.controls.departmentId.setValue(val.id);
      this.courses = val.courses ?? [];
    });

    this.room.valueChanges.subscribe((val: Room) => {
      this.form.controls.roomId.setValue(val.id);
    });

    this.day.valueChanges.subscribe((val: Day) => {
      this.form.controls.dayId.setValue(val.name);
    });
  }

  onSubmit() {
    console.log(this.form.value);

    if(new Date(this.form.value.from) >= new Date(this.form.value.to)) {
      alert("Class duration cannot be 0 or less than 0 minutes!");
      return;
    }
    //post:
    this.roomsService.AllocateClassRoom(this.form.value).subscribe(
      res => {
        //success
      },
      error => {
        console.log(error);
      },
      () => {
        this.form.reset();
        this.day.setValue('');
        this.room.setValue('');
        this.department.setValue('');
      }
    );
  }

}
