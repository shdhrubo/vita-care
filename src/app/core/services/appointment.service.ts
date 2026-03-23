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

  getAllAppointments(
    search: string,
    pageNumber: number,
    pageSize: number
  ): Observable<PaginatedAppointments> {
    return this.http.get<PaginatedAppointments>(this.apiUrl, {
      params: {
        search,
        pageNumber,
        pageSize
      }
    });
  }

  updateAppointmentStatus(id: string, newStatus: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, newStatus, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
