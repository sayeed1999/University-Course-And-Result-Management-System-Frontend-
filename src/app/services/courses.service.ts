import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends RepositoryService {

  constructor(http: HttpClient) {
    super(http);
    this.endpoint = 'courses';
    this.url += this.endpoint;
  }

  GetCoursesByDepartmentIncludingTeachersAndSemisters(departmentId: number) {
    return this.http.get<ServiceResponse>(
      `${this.url}/IncludeTeachersAndSemisters/Department/${departmentId}`
    );
  }

  GetCoursesByDepartmentIncludingTeachers(departmentId: number) {
    return this.http.get<ServiceResponse>(
      `${this.url}/IncludeTeachers/Department/${departmentId}`
    );
  }

  GetCoursesByDepartment(departmentId: number) {
    return this.http.get<ServiceResponse>(
      `${this.url}/Department/${departmentId}`
    );
  }

  courseAssignToTeacher(departmentId: number, teacherId: number, courseCode: string) : Observable<ServiceResponse> {
    // console.log(departmentId, teacherId, courseCode)
    return this.http.post<ServiceResponse>(
      `${this.url}/CourseAssignToTeacher`,
      {
        departmentId,
        teacherId,
        courseCode
      }
    );
  }

  getCoursesByDepartmentCode(departmentCode: string) : Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/Department/${departmentCode}`
    );
  }

  GetCoursesWithAllocatedRooms(departmentId: number) : Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/Department/${departmentId}/AllocatedRooms`
    );
  }

  UnassignAll() : Observable<ServiceResponse> {
    return this.http.delete<ServiceResponse>(
      `${this.url}/UnassignAll`
    );
  }
}
