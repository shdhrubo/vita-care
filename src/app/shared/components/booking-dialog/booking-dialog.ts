import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CustomDateAdapter, MY_DATE_FORMATS } from '../../utils/date-adapter';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
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
import { ToastrService } from 'ngx-toastr';
import emailjs from '@emailjs/browser';
import { from } from 'rxjs';

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
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
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
  private readonly toastr = inject(ToastrService);
  readonly doctor: Doctor = inject(MAT_DIALOG_DATA).doctor;

  form = this.fb.group<BookingFormControls>({
    CreatorPhone: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^[0-9+\- ]+$/),
    ]),
    Date: this.fb.control<Date | null>(null, Validators.required),
    Slot: this.fb.control<number | null>(null, Validators.required),
  });

  creatorName = signal('');
  creatorEmail = signal('');

  isSubmitting = signal(false);

  /** Today's date for datepicker min constraint */
  readonly minDate = new Date();

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const day = date.getDay();
    return this.doctor.AvailableDays[day] === 1;
  };

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

    // Format local date to YYYY-MM-DD safely
    const year = rawDate!.getFullYear();
    const month = String(rawDate!.getMonth() + 1).padStart(2, '0');
    const day = String(rawDate!.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const payload: AppointmentRequest = {
      DoctorInfo: {
        DoctorId: this.doctor.Id,
        DoctorName: this.doctor.Name,
        DoctorEmail: this.doctor.Email,
        Department: this.doctor.Department,
        Gender: this.doctor.Gender.Value,
        Specializations: this.doctor.Specializations,
      },
      CreatorName: this.creatorName(),
      CreatorEmail: this.creatorEmail(),
      CreatorPhone,
      Date: formattedDate,
      Slot: Slot!,
    };

    this.appointmentService.createAppointment(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.toastr.success('Appointment Created Successfully!');
        this.sendEmail(payload);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Booking error:', err);
        this.toastr.error('Something Went Wrong!');
        this.isSubmitting.set(false);
      },
    });
  }

  private sendEmail(payload: AppointmentRequest) {
    const slotView =
      this.doctor.Slots.find((s) => s.Value === payload.Slot)?.ViewValue || payload.Slot;

    const templateParams = {
      name: payload.CreatorName,
      to_email: payload.CreatorEmail,
      doctor_name: payload.DoctorInfo.DoctorName,
      appointment_date: payload.Date,
      appointment_time: slotView,
    };

    from(
      emailjs.send('service_vita_care', 'template_1m7gdsk', templateParams, {
        publicKey: '-4llVFsw2tGWqFQ72',
      }),
    ).subscribe({
      next: (response) => {
        console.log('Confirmation email successfully dispatched.', response.text);
      },
      error: (err) => {
        console.error('Failed to send confirmation email', err);
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
