import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { AccountService } from './account.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends RepositoryService {

  constructor(
    http: HttpClient,
    acc: AccountService
  ) {
    super(http, acc);
    this.endpoint = 'departments';
    this.url += this.endpoint;
  }

  // path: departments/all
  getAllDepartmentsWithCoursesAndTeachers(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/all`,
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  // path: departments/courses
  getAllDepartmentsWithCourses(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/courses`,
      {
        headers: this.acc.tokenHeader
      }
    );
  }
}
