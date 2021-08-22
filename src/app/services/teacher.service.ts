import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends RepositoryService {

  constructor(http: HttpClient) {
    super(http);
    this.endpoint = "teachers";
    this.url += this.endpoint;
  }

  GetTeachersByDepartment(departmentId: number) {
    return this.http.get<ServiceResponse>(
      `${this.url}/Department/${departmentId}`
    );
  }
}
