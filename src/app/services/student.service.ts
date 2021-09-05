import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { StudentEnrollOrPublishResultInCourse } from '../models/StudentEnrollOrPublishResult.model';
import { AccountService } from './account.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends RepositoryService {

  constructor(http: HttpClient, acc: AccountService) {
    super(http, acc);
    this.endpoint = 'students';
    this.url += this.endpoint;
  }

  GetAll(regNum: string = ''): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}?regNum=${regNum}`,
      {
        headers: this.acc.tokenHeader
      });
  }

  EnrollInCourse(data: StudentEnrollOrPublishResultInCourse) {
    return this.http.post<ServiceResponse>(
      `${this.url}/enroll-in-course`,
      data,
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  SaveResult(data: StudentEnrollOrPublishResultInCourse) {
    return this.http.post<ServiceResponse>(
      `${this.url}/save-result`,
      data,
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  // GET: Students/Results
  ViewResults() : Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/results`,
      {
        headers: this.acc.tokenHeader
      });
  }

  // GET: Students/Results/1
  ViewResultById(id:number) : Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/results/${id}`,
      {
        headers: this.acc.tokenHeader
      });
  }

  PrintStudentResultByRegNum(reg: string) : Observable<any> {
    return this.http.get<any>(
      `${this.url}/result-sheet/${reg}`, {
        headers: this.acc.tokenHeader,
        responseType: 'blob' as 'json' // 'document' as 'json'
      }
    );
  }
  
}
