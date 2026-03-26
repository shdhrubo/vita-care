import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UpsertUserRequest, DbUser, PaginatedUsers } from '../contracts/user.contracts';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  private readonly baseUrl = `${environment.apiBaseUrl}/api/Users`;

  private currentUserSubject = new BehaviorSubject<DbUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  isStaff$: Observable<boolean> = this.currentUser$.pipe(
    map((user: DbUser | null) => {
      if (!user || !user.Roles) return false;
      const staffRoles = ['admin', 'receptionist'];
      return user.Roles.some((role: string) => staffRoles.includes(role.toLowerCase()));
    }),
  );

  setCurrentUser(user: DbUser | null) {
    this.currentUserSubject.next(user);
  }

  upsertUser(payload: UpsertUserRequest): Observable<DbUser> {
    return this.http.post<DbUser>(`${this.baseUrl}/upsert`, payload);
  }

  getAllUsers(search: string, pageNumber: number, pageSize: number): Observable<PaginatedUsers> {
    return this.http.get<PaginatedUsers>(this.baseUrl, {
      params: { search, pageNumber, pageSize },
    });
  }

  patchUserRoles(email: string, addedRoles: string[], removedRoles: string[]): Observable<any> {
    return this.http.patch(`${this.baseUrl}/roles`, {
      Email: email,
      AddedRoles: addedRoles,
      RemovedRoles: removedRoles,
    });
  }
}
