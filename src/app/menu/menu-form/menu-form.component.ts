import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Menu } from 'src/app/models/Menu.model';
import { AccountService } from 'src/app/services/account.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {

  title = "New Menu";
  mode = 'create';
  menus: Menu[] = [];
  id = 0;

  form = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    parentId: new FormControl(null),
  });

  constructor(
    private accountService: AccountService,
    private menuService: MenuService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchMenus();

    this.activatedRoute.data.subscribe(data => {
      switch(data.kind) {
        case 'create':
          this.mode = 'create';
          this.title = "New Menu";
          break;
        case 'update':
          this.mode = 'update';
          this.title = "Update Menu";
          break;
        default:
          break;
      }
    });
  }

  preload() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let temp = '';
      if(params.get('id') != null) temp = params.get('id') ?? '0';
      this.id = +temp;

      const menu = this.menus.find(x => x.id === this.id);

      this.form.controls.id.setValue( menu?.id );
      this.form.controls.name.setValue( menu?.name );
      this.form.controls.url.setValue( menu?.url );
      this.form.controls.parentId.setValue( menu?.parentId );
      
      this.menus = this.menus.filter(x => x.id != menu?.id);
    });
  }

  fetchMenus() {
    this.menuService.GetAll().subscribe(
      res => {
        this.menus = [];
        this.menus = res.data;
        if(this.mode == "update") this.preload();
      },
      error => {
        this.snackbar.open(`Data fetching error. Check your internet/database connection.`, 'Close');
      }
    );
  }

  onSubmit() {
    
    if(this.form.value.parentId === "null") this.form.controls.parentId.reset();

    if(this.mode == 'create')
    {
      var menu = new Menu(0, this.form.value.name, this.form.value.url, 1, this.form.value.parentId);

      this.menuService.Add(menu).subscribe(
        res => {
          this.accountService.subject.next(true);
          this.snackbar.open(res.message, 'Hurrah!');
          this.reset();
        },
        error => {
          this.accountService.subject.next(true);
          this.snackbar.open(`${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
          this.reset();
        }
      );
    }
    else
    {
      var menu = new Menu(
        this.form.value.id,
        this.form.value.name,
        this.form.value.url,
        1,
        this.form.value.parentId
      );

      this.menuService.Update(menu).subscribe(
        res => {
          this.accountService.subject.next(true);
          this.router.navigate(['../../../menu-list'], { relativeTo: this.activatedRoute });
          this.snackbar.open(res.message, 'Hurrah!');
        },
        error => {
          this.snackbar.open(`${error.error.message ?? 'Please check your internet connection.'}`, 'Close');
          
        }
      );
    }
  }

  delete() {
    if(confirm("Are you sure want to delete?")) {
      this.menuService.DeleteById(this.id).subscribe(
        res => {
          this.accountService.subject.next(true);
          this.router.navigate(['../../../menu-list'], { relativeTo: this.activatedRoute });
          this.snackbar.open('Deleted successfully', 'Okay');
        },
        err => {
          this.router.navigate(['../../../menu-list'], { relativeTo: this.activatedRoute });
          this.snackbar.open(err.err.message ?? 'Deletion failed', 'Close');
        }
      );
    }
  }

  reset() {
    this.form.reset();
  }
}
