import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AccountService } from './services/account.service';
import { AskDialogComponent } from './shared/ask-dialog/ask-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  signedIn = false;
  toDestroy!: Subscription;

  constructor(
    private account: AccountService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {} 

  ngOnInit() {
    this.toDestroy = this.account.subject.subscribe((b:boolean) => {
      this.signedIn = b;
    })
    
    this.account.ReactivateAfterRefresh();
  }

  logout() {

    const dialogRef = this.dialog.open(AskDialogComponent, {
      width: '576px',
      data: {
        message: "Are you sure you want to logout?",
        subMessage: 'You will be logged out from your account..'
      }
    });
    
    dialogRef.afterClosed().subscribe(permission => {
      if(permission == true) {
        this.account.Logout();
      } else {
        this.snackbar.open(`Cancelled!`, 'Close');
      }
    });
  }

  ngOnDestroy() {
    this.toDestroy.unsubscribe();
  }
}
