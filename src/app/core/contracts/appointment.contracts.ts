import { FormControl } from '@angular/forms';

export interface DoctorInfo {
  DoctorId: string;
  DoctorName: string;
  DoctorEmail: string;
  Department: string;
  Gender: number;
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

/** Typed shape of the booking form — only user-input fields */
export interface BookingFormControls {
  CreatorPhone: FormControl<string>;
  Date: FormControl<Date | null>;
  Slot: FormControl<number | null>;
}
