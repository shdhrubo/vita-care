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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, finalize, filter } from 'rxjs';
import { AppointmentService } from '../../../../core/services/appointment.service';
import {
  getStatusColorClass,
  AppointmentResponse,
  AppointmentStatus,
} from '../../../../core/contracts/appointment.contracts';
import {
  ConfirmationModalComponent,
  ConfirmationData,
} from '../../../../shared/components/confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-all-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './all-appointments.html',
  styleUrl: './all-appointments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllAppointmentsPage implements OnInit, OnDestroy {
  private appointmentService = inject(AppointmentService);
  private dialog = inject(MatDialog);
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

  updateStatus(apt: AppointmentResponse, status: AppointmentStatus) {
    let confirmData: ConfirmationData;

    switch (status) {
      case AppointmentStatus.Canceled:
        confirmData = {
          title: 'Cancel Appointment',
          message: `Are you sure you want to cancel the appointment?`,
          confirmLabel: 'Yes, Cancel',
          confirmColor: 'red',
        };
        break;
      case AppointmentStatus.Approved:
        confirmData = {
          title: 'Approve Appointment',
          message: `Are you sure you want to approve the appointment?`,
          confirmLabel: 'Approve',
          confirmColor: 'green',
        };
        break;
      case AppointmentStatus.NotVisited:
        confirmData = {
          title: 'Mark as Not Visited',
          message: `Are you sure you want to mark ${apt.CreatorName} as a no-show?`,
          confirmLabel: 'Confirm No-Show',
          confirmColor: 'orange',
        };
        break;
      case AppointmentStatus.Visited:
        confirmData = {
          title: 'Mark as Visited',
          message: `Confirm that ${apt.CreatorName} has completed their visit.`,
          confirmLabel: 'Confirm Visit',
          confirmColor: 'indigo',
        };
        break;
      default:
        return; // Unknown status, do nothing
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '450px',
      data: confirmData,
      panelClass: 'custom-dialog-container',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => !!result))
      .subscribe(() => {
        this.executeStatusUpdate(apt.Id, status);
      });
  }

  private executeStatusUpdate(appointmentId: string, status: AppointmentStatus) {
    this.appointmentService.updateAppointmentStatus(appointmentId, status).subscribe({
      next: () => {
        this.appointments.update((items) =>
          items.map((apt) =>
            apt.Id === appointmentId
              ? { ...apt, Status: { Value: status, ViewValue: this.getStatusViewValue(status) } }
              : apt,
          ),
        );
      },
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
