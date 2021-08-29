import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class DesignationService extends RepositoryService {

  constructor(http: HttpClient, acc: AccountService) {
    super(http,acc);
    this.endpoint = "designations";
    this.url += this.endpoint;
  }
}
