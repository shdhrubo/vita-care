import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../../../core/contracts/doctor.contracts';
import { DoctorProfileDetailsComponent } from '../../components/doctor-profile-details/doctor-profile-details';

@Component({
  selector: 'app-doctor-profile-container',
  standalone: true,
  imports: [CommonModule, DoctorProfileDetailsComponent],
  templateUrl: './doctor-profile.html',
  styleUrl: './doctor-profile.scss'
})
export class DoctorProfile implements OnInit {
  private route = inject(ActivatedRoute);

  doctor!: Doctor;

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['doctor']) {
        this.doctor = data['doctor'];
      }
    });
  }

  onEditProfile() {
    // Logic for editing profile
    console.log('Edit profile clicked for', this.doctor.Id);
  }

  onBookAppointment() {
    // Logic for booking appointment
    console.log('Book appointment clicked for', this.doctor.Id);
  }
}
