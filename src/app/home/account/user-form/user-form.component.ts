import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RoleDto } from 'src/app/models/RoleDto.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  title = "Register User";
  availableRoles : { role:string, checked:boolean }[] = [];//["admin", "manager", "guests"];
  mode = 'create';

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    roles: new FormControl([]),
  });

  constructor(
    private accountService: AccountService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchRoles();

    this.activatedRoute.data.subscribe(data => {
      switch(data.kind) {
        case 'create':
          this.mode = 'create';
          this.title = "New User";
          break;
        case 'update':
          this.mode = 'update';
          this.title = "Update User";
          break;
        default:
          break;
      }
    });
  }

  fetchUser() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let email:string = params.get('email') ?? '';
      this.accountService.GetUserByEmail(email).subscribe(
        res => {
          // console.log(res.data)
          this.form.controls.firstName.setValue(res.data.firstName);
          this.form.controls.lastName.setValue(res.data.lastName);
          //this.form.controls.userName.setValue(res.data.userName);
          this.form.controls.email.setValue(res.data.email);
          res.data.roles.forEach((role:string) => {
            const tmp = this.availableRoles.find(x => x.role == role);
            if(tmp) tmp.checked = true;
          });
        },
        error => {
          this.snackbar.open(`${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
        }
      );
    });
  }

  fetchRoles() {
    this.accountService.GetRoles().subscribe(
      res => {
        this.checkboxInit(res.data);
        if(this.mode == 'update') this.fetchUser();
      },
      error => {
        this.snackbar.open(`Role fetching error. Check your internet/database connection.`, 'Close');
      }
    );
  }

  checked(i:number) {
    this.availableRoles[i].checked = !this.availableRoles[i].checked;
    // console.log(this.availableRoles)
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
    this.form.controls.roles.setValue(temp);

    if(this.mode == 'create')
    {
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
    else
    {
      this.accountService.UpdateUser(this.form.value).subscribe(
        res => {
          this.router.navigate(['/account/list']);
          this.snackbar.open(res.message, 'Hurrah!');
        },
        error => {
          this.snackbar.open(`${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
          
        }
      );
    }
  }

  reset() {
    this.form.reset();
    this.fetchRoles();
  }
}
