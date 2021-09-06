import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RegisterDto } from '../models/RegisterDto.model';
import { RoleDto } from '../models/RoleDto.model';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { tap } from 'rxjs/operators';
import { Login } from '../models/Login.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private url: string = 'https://localhost:5001/Account';
  signedIn: boolean = false;
  subject = new Subject<boolean>();
  tokenHeader!: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
  }

  private TokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp; // 'atob' stands for  'ASCII TO Binary'
    return Math.floor( new Date().getTime() / 1000 ) >= expiry;
  }

  ReactivateAfterRefresh() {
    const token = localStorage.getItem('token') ?? '';
    if(token.length > 0)
    {
      if(this.TokenExpired(token)) 
      {
        localStorage.removeItem('token');
      }
      else 
      {
        this.signedIn = true;
        this.SetTokenHeader();
        this.subject.next(true);  
      }
    } 
   } 

  AddRole(newRole: RoleDto): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(
      `${this.url}/Roles`, newRole,
      {
        headers: this.tokenHeader
      }
    );
  }
  
  GetRoles(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/Roles`,
      {
        headers: this.tokenHeader
      }
    );
  }

  RegisterUser(registerDto: RegisterDto): Observable<ServiceResponse> {
    console.log(registerDto);
    return this.http.post<ServiceResponse>(
      `${this.url}/Register`, registerDto,
      {
        headers: this.tokenHeader
      }
    );
  }

  GetAllUsers(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/AllUsers`,
      {
        headers: this.tokenHeader
      }
    );
  }

  GetUserByEmail(email: string): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/${email}`,
      {
        headers: this.tokenHeader
      }
    )
  }

  UpdateUser(registerDto: RegisterDto): Observable<ServiceResponse> {
    return this.http.put<ServiceResponse>(
      `${this.url}/${registerDto.email}/Update`,
      registerDto,
      {
        headers: this.tokenHeader
      }
    );
  }

  GiveMenuPermissions(menuIds: number[], roleName: string): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(
      `${this.url}/role/${roleName}/permission`,
      menuIds,
      {
        headers: this.tokenHeader
      }
    );
  }

  SetTokenHeader() {
    this.tokenHeader = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
  }

  Login(data: Login): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(
      `${this.url}/login`, data,
      {
        headers: this.tokenHeader
      }
    )
    .pipe(tap(res => {
      localStorage.setItem('token', res.data);
      this.SetTokenHeader();
      this.signedIn = true;
      this.subject.next(true);
    })
    );
  }

  Logout(): void {
    localStorage.removeItem('token');
    this.tokenHeader = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    this.signedIn = false;
    this.subject.next(false);
  }
}