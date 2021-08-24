import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleDto } from '../models/RoleDto.model';
import { ServiceResponse } from '../models/ServiceResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private url: string = 'https://localhost:5001/Account';

  constructor(
    private http: HttpClient
  ) { }

  AddRole(newRole: RoleDto): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(
      `${this.url}/Roles`, newRole
    );
  }

  // // RegisterUser(): Observable<ServiceResponse> {

  // }
}
