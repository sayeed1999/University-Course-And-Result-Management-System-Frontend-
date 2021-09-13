import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoomsService } from 'src/app/services/rooms.service';
import { AskDialogComponent } from 'src/app/shared/ask-dialog/ask-dialog.component';

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
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  clicked() {
    const dialogRef = this.dialog.open(AskDialogComponent, {
      width: '576px',
      data: {
        message: 'Are you sure you want to unallocate all classrooms info?',
        subMessage: 'All classrooms info will be unallocated..'
      }
    });

    dialogRef.afterClosed().subscribe(permission => {
      if(permission == true) {
        this.unallocate();
      } else {
        this.snackbar.open(`Cancelled!`, 'Close');
      }
    });
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
        this.snackbar.open(error.error.message ?? "Check your internet connection", 'Close');
        this.unallocating = false;
      }
    );
  }

}