import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDto } from '../models/RegisterDto.model';
import { RoleDto } from '../models/RoleDto.model';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { catchError, map } from 'rxjs/operators';
import { UserDto } from '../models/UserDto.model';
import { Login } from '../models/Login.model';

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
  
  GetRoles(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/Roles`
    );
  }

  RegisterUser(registerDto: RegisterDto): Observable<ServiceResponse> {
    console.log(registerDto);
    return this.http.post<ServiceResponse>(
      `${this.url}/Register`, registerDto
    );
  }

  GetAllUsers(): Observable<ServiceResponse> {
    var tokenHeader = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.get<ServiceResponse>(
      `${this.url}/AllUsers`,
      {
        headers: tokenHeader
      }
    );
  }

  GetUserByEmail(email: string): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/${email}`
    )
  }

  UpdateUser(registerDto: RegisterDto): Observable<ServiceResponse> {
    return this.http.put<ServiceResponse>(
      `${this.url}/${registerDto.email}/Update`,
      registerDto
    );
  }

  GiveMenuPermissions(menuIds: number[], roleName: string): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(
      `${this.url}/role/${roleName}/permission`,
      menuIds
    );
  }

  Login(data: Login): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(
      `${this.url}/login`, data
    );
  }
}