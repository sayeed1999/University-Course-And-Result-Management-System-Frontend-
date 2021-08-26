import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/Course.model';
import { GradeLetter } from 'src/app/models/GradeLetter.model';
import { Student } from 'src/app/models/Student.model';
import { StudentEnrollOrPublishResultInCourse } from 'src/app/models/StudentEnrollOrPublishResult.model';
import { StudentsCourses } from 'src/app/models/StudentsCourses.model';
import { CoursesService } from 'src/app/services/courses.service';
import { GradesService } from 'src/app/services/grades.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'student-enroll-or-publish-result',
  templateUrl: './student-enroll-or-publish-result.component.html',
  styleUrls: ['./student-enroll-or-publish-result.component.css']
})
export class StudentEnrollOrPublishResultComponent implements OnInit {

  mode = '';
  title = "";
  students: Student[] = [];
  grades: GradeLetter[] = [];
  studentsCourses: StudentsCourses[] = [];
  courses: Course[] = [];

  form = new FormGroup({
    reg: new FormControl('', [ Validators.required, Validators.minLength(11) ]),
    name: new FormControl(''),
    email: new FormControl(''),
    deptCode: new FormControl(''),
    courseCode: new FormControl('', Validators.required),
  });

  studentFetching = false;

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private gradesService: GradesService,
    private coursesService: CoursesService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchStudents();
    this.onStudentChange();
    this.fetchGrades();

    this.activatedRoute.data.subscribe(data => {
      switch(data.kind) {
        case 'enroll':
          this.mode = 'enroll';
          this.form.setControl('date', new FormControl(new Date(), Validators.required));
          this.title = "Enroll Student In Course";
          break;
        case 'publish':
          this.mode = 'publish';
          this.form.setControl('grade', new FormControl(null, Validators.required));
          this.title = "Save Student Result";
          break;
        default:
          break;
      }
    });
  }

  fetchStudents() {
    this.studentFetching = true;
    this.studentService.GetAll().subscribe(
      res => {
        this.students = res.data;
        this.studentFetching = false;
      },
      error => {
        this.snackbar.open('Data fetching error! Check your internet connection', 'Close');
        this.studentFetching = false;
      }
    );
  }

  fetchGrades() {
    this.gradesService.GetAll().subscribe(
      res => {
        this.grades = res.data;
      },
      error => {
        this.snackbar.open('Data fetching error! Check your internet connection', 'Close');
      }
    );
  }

  fetchCourses(departmentId: number) {
    this.courses = [];
    this.coursesService.GetCoursesByDepartment(departmentId).subscribe(
      res => {
        this.courses = res.data;
      },
      error => {
        this.snackbar.open('Data fetching error! Check your internet connection', 'Close');
      }
    );
  }

  onSubmit() {
    const student = this.students.find(x => x.registrationNumber == this.form.value.reg);
    
    var data = new StudentEnrollOrPublishResultInCourse(
      student?.departmentId ?? 0,
      this.form.value.courseCode,
      student?.id ?? 0,
      this.form.value.date,
      this.form.value?.grade
    );
    if(this.mode == 'enroll') {
      this.studentService.EnrollInCourse(data).subscribe(
        res => {
          this.snackbar.open('Success! Enrolled succesfully', 'Close');
          this.reset();
        },
        error => {
          this.snackbar.open(`Failed! A student can be enrolled only once. If you are not enrolling twice, then check your internet connection.`, 'Close');
          this.reset();
        }
      );
    }
    else if(this.mode == 'publish') {
      this.studentService.SaveResult(data).subscribe(
        res => {
          this.snackbar.open(`Success! ${this.mode=='enroll'?'Enrolled succesfully':'Result saved successfully'}`, 'Close');
          this.reset();
        },
        error => {
          this.snackbar.open(`Failed! ${ error.error.message ?? 'Please check your internet connection' }`, 'Close');
          this.reset();
        }
      );
    }
  }

  onStudentChange() {

    this.form.controls.reg.valueChanges.subscribe(val => {
        if(val == undefined || val == null || val == '') return;
        const student = this.students.find(x => x.registrationNumber == val);
        this.form.controls.name.setValue(student?.name);
        this.form.controls.email.setValue(student?.email);
        this.form.controls.deptCode.setValue(student?.department?.code);
        this.form.controls.courseCode.setValue('');
        this.studentsCourses = [];
        if(this.mode=='publish') this.studentsCourses = student?.studentsCourses ?? [];
        else this.fetchCourses(student?.departmentId ?? 0);
    });
  }


  reset() {
    this.form.reset();
    this.form.controls?.date.setValue(new Date());
  }
}
