import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-unallocate-all-classrooms',
  templateUrl: './unallocate-all-classrooms.component.html',
  styleUrls: ['./unallocate-all-classrooms.component.css']
})
export class UnallocateAllClassroomsComponent implements OnInit {

  title = 'Unallocate All Classrooms';
  unallocating = false;

  constructor(
    private roomsService: RoomsService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  clicked() {
    if(confirm("Are you sure to unallocate all classroom infos?")) {
      this.unallocate();
    } else {

    }
  }

  unallocate() {
    this.unallocating = true;
    this.roomsService.UnallocateAll().subscribe(
      res => {
        this.router.navigate(['home']);
        this.snackbar.open(res.message, 'Close');
        this.unallocating = false;
      },
      error => {
        this.router.navigate(['home']);
        this.snackbar.open(error.error.message ?? "Some error occurred", 'Close');
        this.unallocating = false;
      }
    );
  }

}
