import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../../../core/contracts/doctor.contracts';
import { DoctorProfileDetailsComponent } from '../../components/doctor-profile-details/doctor-profile-details';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookingDialogComponent } from '../../../../shared/components/booking-dialog/booking-dialog';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-doctor-profile-container',
  standalone: true,
  imports: [CommonModule, DoctorProfileDetailsComponent, MatDialogModule, AsyncPipe],
  templateUrl: './doctor-profile.html',
  styleUrl: './doctor-profile.scss',
})
export class DoctorProfile implements OnInit {
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private userService = inject(UserService);

  isStaff$ = this.userService.isStaff$;

  doctor!: Doctor;

  ngOnInit() {
    this.route.data.subscribe((data) => {
      if (data['doctor']) {
        this.doctor = data['doctor'];
      }
    });
  }

  onEditProfile() {
    this.router.navigate(['/doctors/edit', this.doctor.Id]);
  }

  onBookAppointment() {
    this.dialog.open(BookingDialogComponent, {
      data: { doctor: this.doctor },
      maxWidth: '550px',
    });
  }
}
