import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-appointments.html',
  styleUrl: './all-appointments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllAppointmentsPage {}
