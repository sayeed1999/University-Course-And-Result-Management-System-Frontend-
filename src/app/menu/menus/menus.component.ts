import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from 'src/app/models/Menu.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'menu',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  title = "All Menus"
  dataSource: Menu[] = []
  displayedColumns = [ 'id', 'name', 'url', 'statusId', 'parentId', 'action' ];

  constructor(
    private menuService: MenuService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll() {
    this.menuService.GetAll().subscribe(
      res => {
        this.dataSource = res.data;
      },
      error => {
        this.snackbar.open(`${error.error.message ?? 'Check your internet connection.'}`, 'Close');
      }
    );
  }

}
