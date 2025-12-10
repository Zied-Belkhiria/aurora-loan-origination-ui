import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateCustomerRequest, CustomerResponse } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerApi {
  private base = `${environment.apiBaseUrl}/customers`;

  constructor(private http: HttpClient) {}

  create(payload: CreateCustomerRequest): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(this.base, payload);
  }

  get(id: number): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.base}/${id}`);
  }
}
