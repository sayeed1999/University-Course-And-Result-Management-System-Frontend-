import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Menu } from '../models/Menu.model';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMenu: Menu[] = [];

  constructor(
    private menuService: MenuService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
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

}
