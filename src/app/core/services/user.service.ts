import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UpsertUserRequest, DbUser } from '../contracts/user.contracts';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiBaseUrl}/api/Users/upsert`;

  private currentUserSubject = new BehaviorSubject<DbUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  setCurrentUser(user: DbUser | null) {
    this.currentUserSubject.next(user);
  }

  upsertUser(payload: UpsertUserRequest): Observable<DbUser> {
    return this.http.post<DbUser>(this.apiUrl, payload);
  }
}
