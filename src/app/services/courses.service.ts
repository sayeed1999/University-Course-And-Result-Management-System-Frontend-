import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { AccountService } from './account.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends RepositoryService {

  constructor(
    http: HttpClient,
    acc: AccountService
  ) {
    super(http, acc);
    this.endpoint = 'courses';
    this.url += this.endpoint;
  }

  GetClassScheduleAndRoomAllocationInfo(departmentId: number) {
    return this.http.get<ServiceResponse>(
      `${this.url}/Department/${departmentId}/ClassSchedule`,
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  GetCoursesByDepartmentIncludingTeachersAndSemisters(departmentId: number) {
    return this.http.get<ServiceResponse>(
      `${this.url}/IncludeTeachersAndSemisters/Department/${departmentId}`,
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  GetCoursesByDepartment(departmentId: number) {
    return this.http.get<ServiceResponse>(
      `${this.url}/Department/${departmentId}`,
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  courseAssignToTeacher(departmentId: number, teacherId: number, courseId: string) : Observable<ServiceResponse> {
    // console.log(departmentId, teacherId, courseId)
    return this.http.post<ServiceResponse>(
      `${this.url}/CourseAssignToTeacher`,
      {
        departmentId,
        teacherId,
        courseId
      },
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  getCoursesByDepartmentCode(departmentCode: string) : Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/Department/${departmentCode}`,
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  GetCoursesWithAllocatedRooms(departmentId: number) : Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/Department/${departmentId}/AllocatedRooms`,
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  UnassignAll() : Observable<ServiceResponse> {
    return this.http.delete<ServiceResponse>(
      `${this.url}/UnassignAll`,
      {
        headers: this.acc.tokenHeader
      }
    );
  }
}
