import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'allocate-classrooms',
  templateUrl: './allocate-classrooms.component.html',
  styleUrls: ['./allocate-classrooms.component.css']
})
export class AllocateClassroomsComponent implements OnInit {

  from: any;
  to: any;
  
  constructor() { }

  ngOnInit(): void {
    this.from = new Date();
  }

  submit() {
    var fromHour = new Date(this.from).getHours();
    var fromMin = new Date(this.from).getMinutes();
    var toHour = new Date(this.to).getHours();
    var toMin = new Date(this.to).getMinutes();

    if(new Date(this.to).getTime() <= new Date(this.from).getTime()) {
      console.log("You can't go back in time!")
    }
    
  }

}
