import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from '../models/Menu.model';
import { AccountService } from '../services/account.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  allMenu: Menu[] = [];
  toUnsubscribe!: Subscription;

  constructor(
    private menuService: MenuService,
    private snackbar: MatSnackBar,
    private router: Router,
    private acc: AccountService,
  ) {}

  ngOnInit(): void {
    this.fetchMenus();
    this.toUnsubscribe = this.acc.subject.subscribe(b => {
      if(b) {
        this.fetchMenus();
      } else {
        this.allMenu = [];
        this.router.navigateByUrl('user-and-role-management/account/login');
      }
    });
  }

  fetchMenus() {
    this.allMenu = [];
    this.menuService.GetAllMenuInOrder().subscribe(
      res => {
        this.allMenu = res.data;
      }, error => {
        this.snackbar.open('Couldn\'t fetch menus. Please check your internet connection.');
      }
    );
  }

  navigate(rootUrl:string, childUrl:string)
  {
    const route = rootUrl + '/' + childUrl;
    this.router.navigate([route]);
  }

  ngOnDestroy() {
    this.toUnsubscribe.unsubscribe();
  }
}
