import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-unassign-all-courses',
  templateUrl: './unassign-all-courses.component.html',
  styleUrls: ['./unassign-all-courses.component.css']
})
export class UnassignAllCoursesComponent implements OnInit {

  title = 'Unassign All Courses';

  constructor(
    private courseService: CoursesService,
    private snackbar: MatSnackBar,
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
    this.courseService.UnassignAll().subscribe(
      res => {
        this.snackbar.open(res.message, 'Close');
      },
      error => {
        this.snackbar.open(error.error.message ?? "Some error occurred", 'Close');
      }
    );
  }

}
