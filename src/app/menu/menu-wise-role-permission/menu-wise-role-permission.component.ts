import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from 'src/app/models/Menu.model';
import { MenuRoleDto } from 'src/app/models/MenuRoleDto.model';
import { RoleDto } from 'src/app/models/RoleDto.model';
import { AccountService } from 'src/app/services/account.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-wise-role-permission',
  templateUrl: './menu-wise-role-permission.component.html',
  styleUrls: ['./menu-wise-role-permission.component.css']
})
export class MenuWiseRolePermissionComponent implements OnInit {

  title = "Menu-wise Role Permissions";
  roles: RoleDto[] = [];
  menus: Menu[] = [];
  selectedRole = '';
  displayedColumns = ['id', 'tick', 'menu'];
  dataSource: MenuRoleDto[] = [];

  constructor(
    private accountService: AccountService,
    private menuService: MenuService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchRoles();
  }

  change() {
    this.fetchMenus();
  }

  fetchMenus() {
    this.menuService.GetAll().subscribe(
      res => {
        this.menus = res.data;
        // console.log(this.menus);
        this.dataSource = [];
        this.menus.forEach(m => {
          this.dataSource.push(new MenuRoleDto(m.id, false, m.name));
        });
        this.fetchMenusByRole();
      },
      error => {
        this.snackbar.open(`${error.error.message ?? 'Check your internet connection'}`, 'Close'); 
      }
    );
  }

  fetchRoles() {
    this.accountService.GetRoles().subscribe(
      res => {
        this.roles = res.data;
        // console.log(this.roles);
      },
      error => {
        this.snackbar.open(`${error.error.message ?? 'Check your internet connection'}`, 'Close'); 
      }
    );
  }

  fetchMenusByRole() {
    this.menuService.GetMenusByRole(this.selectedRole).subscribe(
      res => {
        // res.data.push(new Menu(0, 'Configuration', '', 1, 1));
        // console.log(res.data);
        res.data.forEach((m:Menu) => {
          const menu = this.dataSource.find(x => x.name == m.name);
          if(menu) menu.checked = true;
        });
      },
      error => {
        this.snackbar.open(`${error.error.message ?? 'Check your internet connection'}`, 'Close'); 
      }
    );
  }

}
