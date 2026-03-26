import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../../../core/services/doctor.service';
import { UpsertDoctorRequest, Doctor } from '../../../../core/contracts/doctor.contracts';
import { DoctorFormComponent } from '../../components/doctor-form/doctor-form';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-doctor-edit',
  standalone: true,
  imports: [CommonModule, DoctorFormComponent, MatIconModule],
  templateUrl: './doctor-edit.html',
  styleUrl: './doctor-edit.scss',
})
export class DoctorEdit implements OnInit, OnDestroy {
  private doctorService = inject(DoctorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private destroy$ = new Subject<void>();

  doctor = signal<Doctor | null>(null);
  loading = signal<boolean>(false);

  ngOnInit() {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(({ doctor }) => {
      this.doctor.set(doctor);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(payload: UpsertDoctorRequest) {
    const id = this.doctor()?.Id;
    if (!id) return;

    payload.Id = id;
    this.loading.set(true);
    this.doctorService.updateDoctor(payload).subscribe({
      next: () => {
        this.toastr.success('Doctor profile updated successfully!', 'Success');
        this.router.navigate(['/doctors', id]);
      },
      error: (err) => {
        console.error('Failed to update doctor:', err);
        this.toastr.error('Failed to update doctor profile. Please try again.', 'Error');
        this.loading.set(false);
      },
    });
  }

  onCancel() {
    const id = this.doctor()?.Id;
    this.router.navigate(['/doctors', id || '']);
  }
}
