import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UpsertUserRequest {
  Email: string;
  Name: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiBaseUrl}/api/Users/upsert`;

  upsertUser(payload: UpsertUserRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, payload);
  }
}
