import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { MenuService } from '../services/menu.service';

@Injectable({
  providedIn: 'root'
})
export class PermitGuard implements CanActivate {

  constructor(
    private menuService: MenuService,
    private router: Router,
    private acc: AccountService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const fullpath = state.url; // console.log(route.url, state.url)
      
      if( fullpath==='/' || this.menuService.allowedRoutes.includes(fullpath) ) {
        return true;
      } else {
        if(this.acc.signedIn)
            this.router.navigateByUrl('/');
        else
            this.router.navigateByUrl('/user-and-role-management/account/login');
        return false;
      }
  }
  
}
