import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Student } from 'src/app/models/Student.model';

@Component({
  selector: 'app-result-sheet-generation',
  templateUrl: './result-sheet-generation.component.html',
  styleUrls: ['./result-sheet-generation.component.css']
})
export class ResultSheetGenerationComponent implements AfterViewInit {

  student: Student | undefined;
  displayedColumns = [ 'code', 'name', 'grade' ];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras?.state as Student;
  }

  ngAfterViewInit() {
    this.exportHtmlToPDF();
  }

  exportHtmlToPDF() {
    // make pdf
    let data = document.getElementById('result-sheet') ?? document.createElement('div');
    html2canvas(data).then(canvas => {
    
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      
      PDF.save('./result-sheet.pdf');
    });     
  }

}
