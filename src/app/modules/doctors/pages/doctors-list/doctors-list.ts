import { Component, OnInit, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { DoctorService } from '../../../../core/services/doctor.service';
import { Doctor } from '../../../../core/contracts/doctor.contracts';
import { DoctorsListingComponent } from '../../containers/doctors-listing/doctors-listing';

@Component({
  selector: 'app-doctors-list-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DoctorsListingComponent],
  templateUrl: './doctors-list.html',
  styleUrl: './doctors-list.scss',
})
export class DoctorsList implements OnInit, OnDestroy {
  private doctorService = inject(DoctorService);
  private destroy$ = new Subject<void>();

  // Reactive State
  doctors = signal<Doctor[]>([]);
  totalCount = signal<number>(0);
  loading = signal<boolean>(false);
  initialLoading = signal<boolean>(true);
  currentPage = signal<number>(1);
  pageSize = 10;

  searchControl = new FormControl('');

  ngOnInit() {
    this.setupSearch();
    this.loadDoctors();
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
        this.loadDoctors();
      });
  }

  private resetPagination() {
    this.doctors.set([]);
    this.currentPage.set(1);
    this.totalCount.set(0);
  }

  loadDoctors() {
    if (this.loading()) return;

    this.loading.set(true);
    const search = this.searchControl.value || '';

    this.doctorService
      .getDoctors(search, this.currentPage(), this.pageSize)
      .pipe(
        finalize(() => {
          this.loading.set(false);
          this.initialLoading.set(false);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          this.doctors.update((prev) => [...prev, ...response.Items]);
          this.totalCount.set(response.TotalCount);
        },
        error: (err) => {
          console.error('Error fetching doctors:', err);
          this.loading.set(false);
        },
      });
  }

  onScrollReached() {
    if (this.hasMore()) {
      this.currentPage.update((p) => p + 1);
      this.loadDoctors();
    }
  }

  hasMore(): boolean {
    return this.doctors().length < this.totalCount();
  }
}
