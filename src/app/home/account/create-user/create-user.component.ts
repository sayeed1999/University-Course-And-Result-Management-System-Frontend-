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
  availableRoles : { role:string, checked:boolean }[] = [];//["admin", "manager", "guests"];

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    roles: new FormControl(''),
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
        this.checkboxInit(res.data);
      },
      error => {
        this.snackbar.open(`Role fetching error. Check your internet/database connection.`, 'Close');
      }
    );
  }

  checked(i:number) {
    this.availableRoles[i].checked = !this.availableRoles[i].checked;
  }

  checkboxInit(data: any) {
    this.availableRoles = [];
    data.forEach((element:string) => {
      this.availableRoles.push({
        role: element,
        checked: false
      });
    });
  }

  onSubmit() {
    var temp : string[] = [];
    this.availableRoles.forEach(element => {
      if(element.checked) temp.push( element.role );
    });
    const str:string = temp.join(',');
    this.form.controls.roles.setValue(str);

    this.accountService.RegisterUser(this.form.value).subscribe(
      res => {
        this.snackbar.open(res.message, 'Hurrah!');
        this.reset();
      },
      error => {
        this.snackbar.open(`${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
        this.reset();
      }
    );
  }

  reset() {
    this.form.reset();
    this.fetchRoles();
  }
}
