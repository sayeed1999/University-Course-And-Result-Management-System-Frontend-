import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unassign-all-courses',
  templateUrl: './unassign-all-courses.component.html',
  styleUrls: ['./unassign-all-courses.component.css']
})
export class UnassignAllCoursesComponent implements OnInit {

  title = 'Unassign All Courses';

  constructor() { }

  ngOnInit(): void {
  }

  clicked() {
    if(confirm("Are you sure to unassign all courses?")) {

    } else {
      
    }
  }

}
