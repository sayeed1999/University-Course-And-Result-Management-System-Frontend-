import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterDto } from 'src/app/models/RegisterDto.model';
import { UserDto } from 'src/app/models/UserDto.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title = "All Users"
  dataSource: UserDto[] = [];
  displayedColumns = [ 'firstname', 'lastname', 'username', 'email', 'action' ];

  constructor(
    private accountController: AccountService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll() {
    this.accountController.GetAllUsers().subscribe(
      res => {
        this.dataSource = res.data;
      },
      error => {
        this.snackbar.open(`${error.error.message ?? 'Check your internet connection.'}`, 'Close');
      }
    );
  }

}
