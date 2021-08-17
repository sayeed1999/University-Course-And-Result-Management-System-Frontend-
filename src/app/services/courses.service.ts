import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}