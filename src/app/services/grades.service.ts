import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class GradesService extends RepositoryService {

  constructor(http: HttpClient) {
    super(http);
    this.endpoint = "grades";
    this.url += this.endpoint;
  }
}
