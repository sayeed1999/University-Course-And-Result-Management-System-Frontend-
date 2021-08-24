import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css']
})
export class AddRolesComponent implements OnInit {

  title = "New Role";

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(
    private accountService: AccountService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.accountService.AddRole(this.form.value).subscribe(
      res => {
        this.snackbar.open(res.message, 'Okay');
      },
      error => {
        this.snackbar.open(`If your internet connection is okay, may be the role you are trying to create is already on the database. Check available roles in user creation page.`, 'Close');
      }
    );
  }

}
