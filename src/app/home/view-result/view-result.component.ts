import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/Student.model';
import { StudentsCourses } from 'src/app/models/StudentsCourses.model';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {

  title = "View Result";
  students: Student[] = [];
  student!: Student;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl(''),
    dept: new FormControl(''),
  });
  dataSource: StudentsCourses[] = [];
  displayedColumns = [ 'code', 'name', 'grade' ];
  myControl = new FormControl();

  constructor(
    private studentService: StudentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchStudents();

    this.myControl.valueChanges.subscribe((val:string) => {
      this.fetchStudents(val);
    });
  }

  fetchStudents(regNum:string = '') {
    this.studentService.GetAll(regNum).subscribe(
      res => {
        this.students = res.data;
        const _student = this.students.find(x => x.registrationNumber === regNum);
        
        if(_student != null) {
          this.student = _student;
          // console.log(this.student)
          this.form.controls.name.setValue( this.student.name );
          this.form.controls.email.setValue( this.student.email );
          this.form.controls.dept.setValue( this.student.department?.name );
          this.dataSource = this.student.studentsCourses ?? [];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  resultGenerate() {
    window.open("https://localhost:5001/Students/Result-Sheet/" + this.student.registrationNumber, "_blank");
    // this.studentService.PrintStudentResultByRegNum(this.student.value.registrationNumber).subscribe(res => {});
    // this.router.navigate([this.router.url, 'result-sheet-generation'], { state: this.student.value });
  }

}
