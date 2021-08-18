import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/Course.model';
import { Student } from 'src/app/models/Student.model';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'enroll-student-in-course',
  templateUrl: './enroll-student-in-course.component.html',
  styleUrls: ['./enroll-student-in-course.component.css']
})
export class EnrollStudentInCourseComponent implements OnInit {

  title = "Enroll Student In Course";
  students: Student[] = [];
  courses: Course[] = [];

  student = new FormControl();

  form = new FormGroup({
    reg: new FormControl('', Validators.required),
    name: new FormControl(''),
    email: new FormControl(''),
    deptCode: new FormControl(''),
    courseCode: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required)
  });

  constructor(
    private studentService: StudentService,
    private courseService: CoursesService
  ) { }

  ngOnInit(): void {
    this.fetchStudents();

    this.onStudentChange();
    this.onDepartmentChange();
  }

  fetchStudents() {
    this.studentService.GetAll().subscribe(
      res => {
        this.students = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchCourses(departmentCode: string) {
    if(departmentCode == undefined || departmentCode=='') this.courses = [];

    else this.courseService.getCoursesByDepartmentCode(departmentCode).subscribe(
      res => {
        this.courses = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onStudentChange() {

    this.student.valueChanges.subscribe((val:Student) => {
      console.log(val);
      if(val as Student) {
        this.form.controls.name.setValue(val.name);
        this.form.controls.email.setValue(val.email);
        this.form.controls.deptCode.setValue(val.department?.code);
        this.form.controls.courseCode.setValue('');
      }
    });
    console.log(this.student)
  }

  onDepartmentChange() {
    this.form.controls.deptCode.valueChanges.subscribe((val:string) => {
      this.fetchCourses(val);
    });
  }
}
