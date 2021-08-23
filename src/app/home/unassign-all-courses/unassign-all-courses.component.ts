import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-unassign-all-courses',
  templateUrl: './unassign-all-courses.component.html',
  styleUrls: ['./unassign-all-courses.component.css']
})
export class UnassignAllCoursesComponent implements OnInit {

  title = 'Unassign All Courses';
  unassigning = false;

  constructor(
    private courseService: CoursesService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  clicked() {
    const dialogRef = this.dialog.open(ConfirmUnassignDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(permission => {
      if(permission == true) {
        this.unassign();
      } else {
        this.snackbar.open(`Cancelled!`, 'Close');
      }
    });

  }

  unassign() {
    this.unassigning = true;
    this.courseService.UnassignAll().subscribe(
      res => {
        this.router.navigate(['home']);
        this.snackbar.open(res.message, 'Close');
        this.unassigning = false;
      },
      error => {
        this.router.navigate(['home']);
        this.snackbar.open(error.error.message ?? "Check your internet connection", 'Close');
        this.unassigning = false;
      }
    );
  }

}



@Component({
  selector: 'confirm-unassign-dialog',
  templateUrl: 'confirm-unassign.component.html',
})
export class ConfirmUnassignDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmUnassignDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    
  onNoClick(): void {
    this.dialogRef.close();
  }

}