import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { AskDialogComponent } from 'src/app/shared/ask-dialog/ask-dialog.component';

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
    const dialogRef = this.dialog.open(AskDialogComponent, {
      width: '576px',
      data: {
        message: 'Are you sure to unassign all courses?',
        subMessage: 'All course-related infos will be unassigned..'
      }
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