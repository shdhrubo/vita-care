import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../../../core/services/doctor.service';
import { UpsertDoctorRequest } from '../../../../core/contracts/doctor.contracts';
import { DoctorFormComponent } from '../../components/doctor-form/doctor-form';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-doctor-create',
  standalone: true,
  imports: [CommonModule, DoctorFormComponent, MatIconModule],
  templateUrl: './doctor-create.html',
  styleUrl: './doctor-create.scss',
})
export class DoctorCreate {
  private doctorService = inject(DoctorService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  loading = signal<boolean>(false);

  onSubmit(payload: UpsertDoctorRequest) {
    this.loading.set(true);
    this.doctorService.createDoctor(payload).subscribe({
      next: () => {
        this.toastr.success('Doctor profile created successfully!', 'Success');
        this.router.navigate(['/doctors']);
      },
      error: (err) => {
        console.error('Failed to create doctor:', err);
        this.toastr.error('Failed to create doctor profile. Please try again.', 'Error');
        this.loading.set(false);
      },
    });
  }

  onCancel() {
    this.router.navigate(['/doctors']);
  }
}
