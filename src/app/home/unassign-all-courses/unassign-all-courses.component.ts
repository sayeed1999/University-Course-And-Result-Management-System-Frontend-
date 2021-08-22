import { Component, OnInit } from '@angular/core';
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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  clicked() {
    if(confirm("Are you sure to unassign all courses?")) {
      this.unassign();
    } else {

    }
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
        this.snackbar.open(error.error.message ?? "Some error occurred", 'Close');
        this.unassigning = false;
      }
    );
  }

}
