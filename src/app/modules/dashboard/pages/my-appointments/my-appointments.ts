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
import { ToastrService } from 'ngx-toastr';
import {
  Subject,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  tap,
} from 'rxjs';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { UserService } from '../../../../core/services/user.service';
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
  selector: 'app-my-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './my-appointments.html',
  styleUrl: './my-appointments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAppointmentsPage implements OnInit, OnDestroy {
  private appointmentService = inject(AppointmentService);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);
  private destroy$ = new Subject<void>();

  appointments = signal<AppointmentResponse[]>([]);
  totalCount = signal<number>(0);
  loading = signal<boolean>(false);
  initialLoading = signal<boolean>(true);
  currentPage = signal<number>(1);
  pageSize = 10;
  AppointmentStatus = AppointmentStatus;

  userEmail = signal<string | null>(null);
  searchControl = new FormControl('');

  ngOnInit() {
    this.setupSearch();
    this.userService.currentUser$
      .pipe(
        filter((user) => !!user),
        tap((user) => this.userEmail.set(user!.Email)),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.resetPagination();
        this.loadAppointments();
      });
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
    if (this.loading() || !this.userEmail()) return;

    this.loading.set(true);
    const search = this.searchControl.value || '';

    this.appointmentService
      .getAppointmentsByEmail(this.userEmail()!, search, this.currentPage(), this.pageSize)
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
          message: `Are you sure you want to cancel your appointment?`,
          confirmLabel: 'Yes, Cancel',
          confirmColor: 'red',
        };
        break;
      // You can add more matching logic here if needed, like deleting/rescheduling
      default:
        return;
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
        this.toastr.success(`Appointment ${this.getStatusViewValue(status)} successfully!`);
        this.resetPagination();
        this.loadAppointments();
      },
      error: () => {
        this.toastr.error('Something went wrong! Please try again.');
      },
    });
  }

  deleteAppointment(apt: AppointmentResponse) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '450px',
      data: {
        title: 'Delete Appointment',
        message: `Are you sure you want to completely delete your appointment?`,
        confirmLabel: 'Yes, Delete',
        confirmColor: 'red',
      },
      panelClass: 'custom-dialog-container',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((result) => !!result))
      .subscribe(() => {
        this.appointmentService.deleteAppointment(apt.Id).subscribe({
          next: () => {
            this.toastr.success('Appointment deleted successfully!');
            this.resetPagination();
            this.loadAppointments();
          },
          error: () => {
            this.toastr.error('Something went wrong! Please try again.');
          },
        });
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
