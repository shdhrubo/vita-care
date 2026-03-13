import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Doctor, DoctorListResponse } from '../contracts/doctor.contracts';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/api/Doctors`;

  getDoctors(
    search: string = '',
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<DoctorListResponse> {
    let params = new HttpParams()
      .set('search', search)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<DoctorListResponse>(this.apiUrl, { params });
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }
}
