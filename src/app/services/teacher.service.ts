import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { AccountService } from './account.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends RepositoryService {

  constructor(http: HttpClient, acc: AccountService) {
    super(http, acc);
    this.endpoint = "teachers";
    this.url += this.endpoint;
  }

  GetTeachersByDepartment(departmentId: number) {
    return this.http.get<ServiceResponse>(
      `${this.url}/Department/${departmentId}`,
      {
        headers: this.acc.tokenHeader
      });
  }
}
