import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceResponse } from 'src/app/models/ServiceResponse.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "Login"
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private accountService: AccountService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.accountService.Login(this.form.value).subscribe(
      (res: ServiceResponse) => {
        // console.log('token:- ' , res.data);
        localStorage.setItem('token', res.data);
        this.snackbar.open('Logged in successfully! :)');
        this.form.reset();
      },
      (error: HttpErrorResponse) => {
        this.snackbar.open(error.error.message ?? 'Check your internet connection', 'Close');
        this.form.reset();
      }
    );
  }

}
