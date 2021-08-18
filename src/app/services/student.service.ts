import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { StudentEnrollOrPublishResultInCourse } from '../models/StudentEnrollOrPublishResult.model';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends RepositoryService {

  constructor(http: HttpClient) {
    super(http);
    this.endpoint = 'students';
    this.url += this.endpoint;
  }

  EnrollInCourse(data: StudentEnrollOrPublishResultInCourse) {
    return this.http.post<ServiceResponse>(
      `${this.url}/enroll-in-course`,
      data
    );
  }

  SaveResult(data: StudentEnrollOrPublishResultInCourse) {
    return this.http.post<ServiceResponse>(
      `${this.url}/save-result`,
      data
    );
  }

  // GET: Students/Results
  ViewResults = () : Observable<ServiceResponse> => this.http.get<ServiceResponse>(`${this.url}/results`);
}
