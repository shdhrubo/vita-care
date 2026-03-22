import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { AppointmentService } from '../../../../core/services/appointment.service';
import {
  getStatusColorClass,
  AppointmentResponse,
  AppointmentStatus,
} from '../../../../core/contracts/appointment.contracts';

@Component({
  selector: 'app-all-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './all-appointments.html',
  styleUrl: './all-appointments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllAppointmentsPage implements OnInit, OnDestroy {
  private appointmentService = inject(AppointmentService);
  private destroy$ = new Subject<void>();

  appointments = signal<AppointmentResponse[]>([]);
  totalCount = signal<number>(0);
  loading = signal<boolean>(false);
  initialLoading = signal<boolean>(true);
  currentPage = signal<number>(1);
  pageSize = 10;
  AppointmentStatus = AppointmentStatus;

  searchControl = new FormControl('');

  ngOnInit() {
    this.setupSearch();
    this.loadAppointments();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch() {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.resetPagination();
        this.loadAppointments();
      });
  }

  private resetPagination() {
    this.appointments.set([]);
    this.currentPage.set(1);
    this.totalCount.set(0);
  }

  loadAppointments() {
    if (this.loading()) return;

    this.loading.set(true);
    const search = this.searchControl.value || '';

    this.appointmentService
      .getAllAppointments(search, this.currentPage(), this.pageSize)
      .pipe(
        finalize(() => {
          this.loading.set(false);
          this.initialLoading.set(false);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          this.appointments.update((prev) => [...prev, ...response.Items]);
          this.totalCount.set(response.TotalCount);
        },
        error: (err) => {
          console.error('Error fetching appointments:', err);
          this.loading.set(false);
        },
      });
  }

  updateStatus(appointmentId: string, status: AppointmentStatus) {
    this.appointmentService.updateAppointmentStatus(appointmentId, status).subscribe({
      next: () => {},
      error: (err) => {
        console.error('Error updating appointment status:', err);
      },
    });
  }

  private getStatusViewValue(status: AppointmentStatus): string {
    switch (status) {
      case AppointmentStatus.Requested:
        return 'Requested';
      case AppointmentStatus.Approved:
        return 'Approved';
      case AppointmentStatus.Canceled:
        return 'Canceled';
      case AppointmentStatus.Visited:
        return 'Visited';
      case AppointmentStatus.NotVisited:
        return 'Not Visited';
      default:
        return 'Unknown';
    }
  }

  onScrollReached() {
    if (this.hasMore()) {
      this.currentPage.update((p) => p + 1);
      this.loadAppointments();
    }
  }

  hasMore(): boolean {
    return this.appointments().length < this.totalCount();
  }

  loadMore() {
    this.onScrollReached();
  }

  getStatusColor(statusValue: number): string {
    return getStatusColorClass(statusValue);
  }
}
