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

export interface DoctorListResponse {
  Items: Doctor[];
  TotalCount: number;
}
