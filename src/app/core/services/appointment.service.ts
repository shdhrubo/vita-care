import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppointmentRequest, PaginatedAppointments } from '../contracts/appointment.contracts';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/api/Appointments`;

  createAppointment(request: AppointmentRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }

  getAppointmentsByEmail(
    email: string,
    search: string,
    pageNumber: number,
    pageSize: number
  ): Observable<PaginatedAppointments> {
    return this.http.get<PaginatedAppointments>(`${this.apiUrl}/by-email`, {
      params: {
        email,
        search,
        pageNumber,
        pageSize
      }
    });
  }
}
