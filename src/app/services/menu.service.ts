import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { AccountService } from './account.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends RepositoryService {

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
    );
  }

  GetAllRootMenus() : Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/Root`,
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
