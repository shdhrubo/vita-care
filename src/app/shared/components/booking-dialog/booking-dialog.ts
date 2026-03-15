import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatError, MatFormFieldModule, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@auth0/auth0-angular';

import { AppointmentService } from '../../../core/services/appointment.service';
import { Doctor } from '../../../core/contracts/doctor.contracts';
import {
  AppointmentRequest,
  BookingFormControls,
} from '../../../core/contracts/appointment.contracts';

@Component({
  selector: 'app-booking-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOption,
    MatDatepickerModule,
    MatIconModule,
    MatSuffix,
  ],
  templateUrl: './booking-dialog.html',
  styleUrl: './booking-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private appointmentService = inject(AppointmentService);
  private dialogRef = inject(MatDialogRef<BookingDialogComponent>);

  /** The doctor passed from the profile page resolver data */
  readonly doctor: Doctor = inject(MAT_DIALOG_DATA).doctor;

  /** Typed reactive form — only contains user-editable inputs */
  form = this.fb.group<BookingFormControls>({
    CreatorPhone: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^[0-9+\- ]+$/),
    ]),
    Date: this.fb.control<Date | null>(null, Validators.required),
    Slot: this.fb.control<number | null>(null, Validators.required),
  });

  /** Logged-in user info — auto-populated from Auth0, displayed read-only */
  creatorName = signal('');
  creatorEmail = signal('');

  isSubmitting = signal(false);

  /** Today's date for datepicker min constraint */
  readonly minDate = new Date();

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.creatorName.set(user.name ?? '');
        this.creatorEmail.set(user.email ?? '');
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting.set(true);

    const { CreatorPhone, Date: rawDate, Slot } = this.form.getRawValue();

    const payload: AppointmentRequest = {
      DoctorInfo: {
        DoctorId: this.doctor.Id,
        DoctorName: this.doctor.Name,
        DoctorEmail: this.doctor.Email,
        Department: this.doctor.Department,
        Gender: this.doctor.Gender.Value,
      },
      CreatorName: this.creatorName(),
      CreatorEmail: this.creatorEmail(),
      CreatorPhone,
      Date: rawDate!.toISOString().split('T')[0],
      Slot: Slot!,
    };

    this.appointmentService.createAppointment(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Booking error:', err);
        this.isSubmitting.set(false);
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
