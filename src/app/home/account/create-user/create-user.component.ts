import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  title = "Register User";
  availableRoles : string[] = [];//["admin", "manager", "guests"];

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    roles: new FormControl([])
  });

  constructor(
    private accountService: AccountService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchRoles();
  }

  fetchRoles() {
    this.accountService.GetRoles().subscribe(
      res => {
        this.availableRoles = res.data;
      },
      error => {
        this.snackbar.open(`Role fetching error. Check your internet/database connection.`, 'Close');
      }
    );
  }

  checked(role: string) {
    const index = this.form.value.roles.findIndex((x:string) => x == role);
    if(index == -1) this.form.controls.roles.setValue([...this.form.value.roles, role]);
    else this.form.controls.roles.setValue( this.form.value.roles.filter((x:string) => x != role) );
  }

  onSubmit() {
    this.accountService.RegisterUser(this.form.value).subscribe(
      res => {
        this.snackbar.open(res.message, 'Hurrah!');
        this.form.reset();
      },
      error => {
        this.snackbar.open(`${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
        this.form.reset();
      }
    );
  }
}
