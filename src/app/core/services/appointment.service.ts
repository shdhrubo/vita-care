import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppointmentRequest } from '../contracts/appointment.contracts';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/api/Appointments`;

  createAppointment(request: AppointmentRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }
}
