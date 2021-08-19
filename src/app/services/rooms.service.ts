import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllocateClassroom } from '../models/AllocateClassroom.model';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends RepositoryService {

  constructor(http: HttpClient)  {
    super(http);
    this.endpoint = 'rooms';
    this.url += this.endpoint;
  }

  AllocateClassRoom(data: AllocateClassroom) : Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(
      `${this.url}/allocate-classroom`,
      data
    );
  }
}
