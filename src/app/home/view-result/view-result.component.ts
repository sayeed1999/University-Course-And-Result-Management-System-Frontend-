import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/Student.model';
import { StudentsCourses } from 'src/app/models/StudentsCourses.model';
import { StudentService } from 'src/app/services/student.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {

  title = "View Result";
  students: Student[] = [];
  student = new FormControl();
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl(''),
    deptCode: new FormControl(''),
  });
  dataSource: StudentsCourses[] = [];
  displayedColumns = [ 'code', 'name', 'grade' ];

  constructor(
    private studentService: StudentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchStudents();
    
    this.student.valueChanges.subscribe((val:Student) => {
      this.form.controls.name.setValue(val.name);
      this.form.controls.email.setValue(val.email);
      this.form.controls.deptCode.setValue(val.department?.code);
      this.dataSource = val.studentsCourses ?? [];
    });
  }

  fetchStudents() {
    this.studentService.ViewResults().subscribe(
      res => this.students = res.data,
      error => {
        console.log(error);
      }
    );
  }

  resultGenerate() {
    window.open("https://localhost:5001/Students/Result-Sheet/" + this.student.value.registrationNumber, "_blank");
    // this.studentService.PrintStudentResultByRegNum(this.student.value.registrationNumber).subscribe(res => {});
    // this.router.navigate([this.router.url, 'result-sheet-generation'], { state: this.student.value });
  }

}
