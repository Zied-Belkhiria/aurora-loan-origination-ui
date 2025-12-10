import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateLoanRequest, LoanResponse } from '../models/loan.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoanApi {
  private base = `${environment.apiBaseUrl}/loans`;

  constructor(private http: HttpClient) {}

  create(payload: CreateLoanRequest): Observable<LoanResponse> {
    return this.http.post<LoanResponse>(this.base, payload);
  }

  get(id: number): Observable<LoanResponse> {
    return this.http.get<LoanResponse>(`${this.base}/${id}`);
  }
}
