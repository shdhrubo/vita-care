import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UpsertDoctorRequest, Doctor, DoctorFormControls } from '../../../../core/contracts/doctor.contracts';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './doctor-form.html',
  styleUrl: './doctor-form.scss',
})
export class DoctorFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() initialData: Doctor | null = null;
  @Input() isEdit = false;
  @Input() loading = false;
  @Output() formSubmit = new EventEmitter<UpsertDoctorRequest>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup<DoctorFormControls>;

  get f() {
    return this.form.controls;
  }

  readonly genders = [
    { value: 1, viewValue: 'Male' },
    { value: 2, viewValue: 'Female' },
    { value: 3, viewValue: 'Other' },
  ];

  readonly slots = [
    { value: 1, viewValue: '10 am to 1 pm' },
    { value: 2, viewValue: '2 pm to 5 pm' },
    { value: 3, viewValue: '5 pm to 10 pm' },
  ];

  readonly days = [
    { short: 'S', full: 'Sunday' },
    { short: 'M', full: 'Monday' },
    { short: 'T', full: 'Tuesday' },
    { short: 'W', full: 'Wednesday' },
    { short: 'T', full: 'Thursday' },
    { short: 'F', full: 'Friday' },
    { short: 'S', full: 'Saturday' },
  ];

  ngOnInit() {
    this.initForm();
    if (this.initialData) {
      this.patchForm(this.initialData);
    }
  }

  private initForm() {
    this.form = this.fb.group<DoctorFormControls>({
      Name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
      Email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      PhoneNumber: this.fb.nonNullable.control('', [Validators.required, Validators.pattern('^[0-9+]{11,15}$')]),
      Gender: this.fb.nonNullable.control(1, [Validators.required]),
      Specializations: this.fb.nonNullable.control('', [Validators.required]),
      Department: this.fb.nonNullable.control('', [Validators.required]),
      AvailableDays: this.fb.array(
        new Array(7).fill(0).map(() => this.fb.nonNullable.control(0))
      ),
      Slots: this.fb.array<FormControl<number>>([]),
      Fee: this.fb.nonNullable.control(0, [Validators.required, Validators.min(0)]),
    });
  }

  private patchForm(doctor: Doctor) {
    this.form.patchValue({
      Name: doctor.Name,
      Email: doctor.Email,
      PhoneNumber: doctor.PhoneNumber,
      Gender: doctor.Gender.Value,
      Specializations: doctor.Specializations,
      Department: doctor.Department,
      Fee: doctor.Fee,
    });

    // Patch AvailableDays
    const daysArray = this.getAvailableDaysFormArray();
    doctor.AvailableDays.forEach((val, idx) => {
      daysArray.at(idx).setValue(val);
    });

    // Patch Slots
    const slotsArray = this.getSlotsFormArray();
    slotsArray.clear();
    doctor.Slots.forEach(slot => {
      slotsArray.push(this.fb.nonNullable.control(slot.Value));
    });
  }

  getAvailableDaysFormArray(): FormArray<FormControl<number>> {
    return this.f['AvailableDays'];
  }

  getSlotsFormArray(): FormArray<FormControl<number>> {
    return this.f['Slots'];
  }

  toggleDay(index: number) {
    const control = this.getAvailableDaysFormArray().at(index);
    control.setValue(control.value === 1 ? 0 : 1);
  }

  isSlotSelected(slotValue: number): boolean {
    return this.getSlotsFormArray().value.includes(slotValue);
  }

  toggleSlot(slotValue: number) {
    const slots = this.getSlotsFormArray();
    const index = slots.value.indexOf(slotValue);
    if (index === -1) {
      slots.push(this.fb.nonNullable.control(slotValue));
    } else {
      slots.removeAt(index);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: UpsertDoctorRequest = this.form.getRawValue();
    this.formSubmit.emit(payload);
  }
}
