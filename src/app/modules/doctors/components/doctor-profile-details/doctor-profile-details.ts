import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Doctor } from '../../../../core/contracts/doctor.contracts';

@Component({
  selector: 'app-doctor-profile-details',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './doctor-profile-details.html',
  styleUrl: './doctor-profile-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorProfileDetailsComponent {
  @Input({ required: true }) doctor!: Doctor;

  @Output() editProfileClicked = new EventEmitter<void>();
  @Output() bookAppointmentClicked = new EventEmitter<void>();

  readonly days = [
    { short: 'S', full: 'Sunday' },
    { short: 'M', full: 'Monday' },
    { short: 'T', full: 'Tuesday' },
    { short: 'W', full: 'Wednesday' },
    { short: 'T', full: 'Thursday' },
    { short: 'F', full: 'Friday' },
    { short: 'S', full: 'Saturday' },
  ];

  getInitials(name: string): string {
    if (!name) return '??';
    return name
      .split(' ')
      .filter((n) => n.length > 0)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  isAvailableToday(): boolean {
    if (!this.doctor || !this.doctor.AvailableDays) return false;
    const today = new Date().getDay();
    return this.doctor.AvailableDays[today] === 1;
  }
}
