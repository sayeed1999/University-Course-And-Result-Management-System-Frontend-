import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/Menu.model';
import { RoleDto } from 'src/app/models/RoleDto.model';
import { AccountService } from 'src/app/services/account.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-wise-role-permission',
  templateUrl: './menu-wise-role-permission.component.html',
  styleUrls: ['./menu-wise-role-permission.component.css']
})
export class MenuWiseRolePermissionComponent implements OnInit {

  roles: RoleDto[] = [];
  menus: Menu[] = [];

  constructor(
    private accountService: AccountService,
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
  }

  fetchMenus() {
    this.menuService.GetAll().subscribe(
      res => {

      }
    );
  }

}
