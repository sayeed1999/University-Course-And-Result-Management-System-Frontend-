import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/Student.model';
import { StudentsCourses } from 'src/app/models/StudentsCourses.model';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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

  start = false;
  searchRegNum = '';
  fetching = false;

  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit(): void {
    this.myControl.valueChanges.subscribe((val:string) => {
      if(!this.start) {
        this.start = true;
        setTimeout(() => {
          this.start = false;
          this.fetchStudents();
        }, 1500);
      }
    });
  }

  fetchStudents() {
    this.fetching = true;
    this.studentService.GetAll(this.myControl.value).subscribe(
      res => {
        this.students = res.data;
        const _student = this.students.find(x => x.registrationNumber === this.myControl.value);
        
        if(_student != null) {
          this.student = _student;
          this.form.controls.name.setValue( this.student.name );
          this.form.controls.email.setValue( this.student.email );
          this.form.controls.dept.setValue( this.student.department?.name );
          this.dataSource = this.student.studentsCourses ?? [];
        }
        this.fetching = false;
      },
      error => {
        console.log(error);
        this.fetching = false;
      }
    );
  }

  pdfGenerating = false;
  pdfSrc="";

  resultGenerate() {
    this.pdfGenerating = true;
    this.studentService.PrintStudentResultByRegNum(this.student.id).subscribe(
      (blob:Blob) => {
        // console.log(response);
        // let blobUrl: string = window.URL.createObjectURL(response); // Create blobUrl from blob object.
        // console.log(blobUrl); // See the url!
        // window.open(blobUrl); // Open the URL in new window!

        const downloadFile = (blob:Blob, fileName:string) => {
          const link = document.createElement('a');
          // create a blobURI pointing to our Blob
          link.href = URL.createObjectURL(blob);
          this.pdfSrc = link.href;
          link.download = fileName;
          // some browser needs the anchor to be in the doc
          document.body.append(link);
          link.click();
          link.remove();
          // in case the Blob uses a lot of memory
          setTimeout(() => {
            URL.revokeObjectURL(link.href)
            this.pdfGenerating = false;
          }, 3500);
        }; 
        
        downloadFile(blob, "result.pdf");
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}
