import { FormControl, FormArray } from '@angular/forms';

export interface DoctorFormControls {
  Name: FormControl<string>;
  Email: FormControl<string>;
  PhoneNumber: FormControl<string>;
  Gender: FormControl<number>;
  Specializations: FormControl<string>;
  Department: FormControl<string>;
  AvailableDays: FormArray<FormControl<number>>;
  Slots: FormArray<FormControl<number>>;
  Fee: FormControl<number>;
}

export interface SelectOption {
  Value: number;
  ViewValue: string;
}

export interface DoctorSlot {
  Value: number;
  ViewValue: string;
}

export interface Doctor {
  Id: string;
  Name: string;
  Email: string;
  PhoneNumber: string;
  Gender: SelectOption;
  Specializations: string;
  Department: string;
  AvailableDays: number[];
  Slots: DoctorSlot[];
  Fee: number;
}

export interface UpsertDoctorRequest {
  Id?: string;
  Name: string;
  Email: string;
  PhoneNumber: string;
  Gender: number;
  Specializations: string;
  Department: string;
  AvailableDays: number[]; // e.g. [0,1,1,1,1,1,1]
  Slots: number[]; // e.g. [1, 3]
  Fee: number;
}

export interface DoctorListResponse {
  Items: Doctor[];
  TotalCount: number;
}
