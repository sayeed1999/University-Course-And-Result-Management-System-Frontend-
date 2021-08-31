import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Menu } from '../models/Menu.model';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { AccountService } from './account.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends RepositoryService {

  allowedRoutes: string[] = [];

  constructor(
    http: HttpClient,
    acc: AccountService
  ) {
    super(http, acc);

    this.endpoint = 'menu';
    this.url += this.endpoint;
  }

  GetAllMenuInOrder() : Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/InOrder`,
      {
        headers: this.acc.tokenHeader
      }
    ).pipe(tap(res => {
      res.data.forEach((rootMenu: Menu) => {
        const rootRoute = rootMenu.url;
        rootMenu.childMenus?.forEach((childMenu: Menu) => {
          const allowedPath = rootRoute + '/' + childMenu.url;
          this.allowedRoutes.push(allowedPath);
        });
      });
      console.log(this.allowedRoutes);
    }));
  }

  GetAllRootMenus() : Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `/${this.url}/Root`,
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  GetMenusByRole(role: string) : Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/${role}`,
      {
        headers: this.acc.tokenHeader
      }
    );
  }
}
