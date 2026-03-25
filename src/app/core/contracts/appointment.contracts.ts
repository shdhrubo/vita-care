import { FormControl } from '@angular/forms';

export interface DoctorInfo {
  DoctorId: string;
  DoctorName: string;
  DoctorEmail: string;
  Department: string;
  Gender: number;
  Specializations: string;
}

export interface AppointmentRequest {
  Id?: string;
  DoctorInfo: DoctorInfo;
  CreatorEmail: string;
  CreatorName: string;
  CreatorPhone: string;
  Date: string; // "YYYY-MM-DD"
  Slot: number;
}

export interface BookingFormControls {
  CreatorPhone: FormControl<string>;
  Date: FormControl<Date | null>;
  Slot: FormControl<number | null>;
}

export interface ValueViewPair {
  Value: number;
  ViewValue: string;
}

export interface DoctorInfoResponse {
  DoctorId: string;
  DoctorName: string;
  DoctorEmail: string;
  Department: string;
  Specializations: string;
  Gender: ValueViewPair;
}

export interface AppointmentResponse {
  Id: string;
  DoctorInfo: DoctorInfoResponse;
  CreatorEmail: string;
  CreatorName: string;
  CreatorPhone: string;
  Date: string;
  Slot: ValueViewPair;
  Status: ValueViewPair;
}

export interface PaginatedAppointments {
  Items: AppointmentResponse[];
  TotalCount: number;
}

export enum AppointmentStatus {
  Requested = 1,
  Approved = 2,
  Canceled = 3,
  Visited = 4,
  NotVisited = 5,
}

export interface AppointmentStats {
  Total: number;
  Requested: number;
  Approved: number;
  Canceled: number;
  Visited: number;
  NotVisited: number;
}

export function getStatusColorClass(statusValue: number): string {
  switch (statusValue) {
    case AppointmentStatus.Requested:
      return 'bg-blue-100/50 text-blue-700 border-blue-200';
    case AppointmentStatus.Approved:
      return 'bg-green-100/50 text-green-700 border-green-200';
    case AppointmentStatus.Canceled:
      return 'bg-red-100/50 text-red-700 border-red-200';
    case AppointmentStatus.Visited:
      return 'bg-purple-100/50 text-purple-700 border-purple-200';
    case AppointmentStatus.NotVisited:
      return 'bg-orange-100/50 text-orange-700 border-orange-200';
    default:
      return 'bg-slate-100/50 text-slate-700 border-slate-200';
  }
}
