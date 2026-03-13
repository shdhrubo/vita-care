import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Doctor } from '../../../../core/contracts/doctor.contracts';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './doctor-card.html',
  styleUrl: './doctor-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorCardComponent {
  @Input({ required: true }) doctor!: Doctor;

  readonly days = [
    { short: 'S', full: 'Sunday' },
    { short: 'M', full: 'Monday' },
    { short: 'T', full: 'Tuesday' },
    { short: 'W', full: 'Wednesday' },
    { short: 'T', full: 'Thursday' },
    { short: 'F', full: 'Friday' },
    { short: 'S', full: 'Saturday' }
  ];

  isAvailableToday(): boolean {
    if (!this.doctor || !this.doctor.AvailableDays) return false;
    const today = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    return this.doctor.AvailableDays[today] === 1;
  }

  getInitials(name: string): string {
    if (!name) return '??';
    return name
      .split(' ')
      .filter(n => n.length > 0)
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
