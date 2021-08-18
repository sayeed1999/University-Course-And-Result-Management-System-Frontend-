import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/Student.model';
import { StudentsCourses } from 'src/app/models/StudentsCourses.model';
import { StudentService } from 'src/app/services/student.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    private studentService: StudentService
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

  exportHtmlToPDF() {
    // make pdf
    let data = document.getElementById('body') ?? document.createElement('div');
    html2canvas(data).then(canvas => {
    
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      
      PDF.save('angular-demo.pdf');
    });     
  }
}
