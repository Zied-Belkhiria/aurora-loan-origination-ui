import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateAccountRequest, AccountResponse } from '../models/account.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountApi {
  private base = `${environment.apiBaseUrl}/accounts`;

  constructor(private http: HttpClient) {}

  create(payload: CreateAccountRequest): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(this.base, payload);
  }

  get(id: number): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${this.base}/${id}`);
  }
}
