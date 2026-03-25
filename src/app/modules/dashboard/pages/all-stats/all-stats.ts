import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  signal,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { Subject, takeUntil } from 'rxjs';
import { AppointmentStats } from '../../../../core/contracts/appointment.contracts';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-all-stats',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './all-stats.html',
  styleUrl: './all-stats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllStatsPage implements OnInit, OnDestroy {
  private appointmentService = inject(AppointmentService);
  private destroy$ = new Subject<void>();

  stats = signal<AppointmentStats | null>(null);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.loadStats();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadStats() {
    this.loading.set(true);
    this.appointmentService.getAllAppointmentStats().subscribe({
      next: (res: AppointmentStats) => {
        this.stats.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  getStatItems() {
    const s = this.stats();
    if (!s) return [];

    return [
      {
        label: 'Global Total',
        value: s.Total,
        color: 'text-indigo-600',
      },
      {
        label: 'Requested',
        value: s.Requested,
        color: 'text-blue-500',
      },
      {
        label: 'Approved',
        value: s.Approved,
        color: 'text-teal-500',
      },
      {
        label: 'Canceled',
        value: s.Canceled,
        color: 'text-red-400',
      },
      {
        label: 'Visited',
        value: s.Visited,
        color: 'text-purple-500',
      },
      {
        label: 'Not Visited',
        value: s.NotVisited,
        color: 'text-amber-500',
      },
    ];
  }
}
