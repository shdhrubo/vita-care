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
import { UserService } from '../../../../core/services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { DbUser } from '../../../../core/contracts/user.contracts';
import { MatIcon } from '@angular/material/icon';
import { AppointmentStats } from '../../../../core/contracts/appointment.contracts';

@Component({
  selector: 'app-my-stats',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './my-stats.html',
  styleUrl: './my-stats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyStatsPage implements OnInit, OnDestroy {
  private appointmentService = inject(AppointmentService);
  private userService = inject(UserService);
  private destroy$ = new Subject<void>();

  stats = signal<AppointmentStats | null>(null);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.userService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: DbUser | null) => {
        if (user && user.Email) {
          this.loadStats(user.Email);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadStats(email: string) {
    this.loading.set(true);
    this.appointmentService.getAppointmentStats(email).subscribe({
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
        label: 'Total',
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
