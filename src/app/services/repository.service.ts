import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../models/ServiceResponse.model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  private all: any[] = [];
  protected url: string = 'https://localhost:5001/';
  protected endpoint: string = '';

  constructor(
    protected http: HttpClient,
    protected acc: AccountService
  ) {}

  // C R U D ..

  public GetAll(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      this.url,
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  public GetById(id: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(
      `${this.url}/${id}`,
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  public Add(item: any) : Observable<ServiceResponse> {
    
    return this.http.post<ServiceResponse>(
      this.url,
      item,
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  public Update(item: any) : Observable<ServiceResponse>
  {
    return this.http.put<ServiceResponse>(
      this.url, //url
      item, //body
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  public UpdateById(id: number, item: any) : Observable<ServiceResponse>
  {
    return this.http.put<ServiceResponse>(
      `${this.url}/${id}`, //url
      item, //body
      {
        headers: this.acc.tokenHeader
      }
    );
  }

  public DeleteById(id: number) : Observable<ServiceResponse>
  {
    return this.http.delete<ServiceResponse>(
      `${this.url}/${id}`,
      {
        headers: this.acc.tokenHeader,
      }
    );
  }
  
}
