import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/Course.model';
import { GradeLetter } from 'src/app/models/GradeLetter.model';
import { Student } from 'src/app/models/Student.model';
import { StudentEnrollOrPublishResultInCourse } from 'src/app/models/StudentEnrollOrPublishResult.model';
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
  courses: Course[] = [];
  grades: GradeLetter[] = [];

  student = new FormControl();

  form = new FormGroup({
    reg: new FormControl('', Validators.required),
    name: new FormControl(''),
    email: new FormControl(''),
    deptCode: new FormControl(''),
    courseCode: new FormControl('', Validators.required),
  });

  constructor(
    private studentService: StudentService,
    private courseService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private gradesService: GradesService
  ) { }

  ngOnInit(): void {
    this.fetchStudents();
    this.onStudentChange();
    this.onDepartmentChange();
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

  fetchGrades() {
    this.gradesService.GetAll().subscribe(
      res => {
        this.grades = res.data;
        console.log('asd', this.grades)
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    var data = new StudentEnrollOrPublishResultInCourse(
      this.student.value.departmentId,
      this.form.value.courseCode,
      this.student.value.id,
      this.form.value.date,
      this.form.value?.grade
    );
    if(this.mode == 'enroll') {
      this.studentService.EnrollInCourse(data).subscribe(
        res => {
          this.form.reset();
          this.student.reset();
        },
        error => console.log(error)
      );
    }
    else if(this.mode == 'publish') {
      this.studentService.SaveResult(data).subscribe(
        res => {
          this.form.reset();
          this.student.reset();
        },
        error => console.log(error)
      );
    }
  }

  onStudentChange() {

    this.student.valueChanges.subscribe((val:Student) => {
      // console.log(val);
      if(val as Student) {
        this.form.controls.reg.setValue(val.registrationNumber);
        this.form.controls.name.setValue(val.name);
        this.form.controls.email.setValue(val.email);
        this.form.controls.deptCode.setValue(val.department?.code);
        this.form.controls.courseCode.setValue('');
      }
    });
    // console.log(this.student)
    // console.log(this.form)
  }

  onDepartmentChange() {
    this.form.controls.deptCode.valueChanges.subscribe((val:string) => {
      this.fetchCourses(val);
    });
  }
}
