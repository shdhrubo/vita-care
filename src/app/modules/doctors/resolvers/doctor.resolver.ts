import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Doctor } from '../../../core/contracts/doctor.contracts';
import { DoctorService } from '../../../core/services/doctor.service';

export const doctorResolver: ResolveFn<Doctor> = (route, state) => {
  const doctorService = inject(DoctorService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (!id) {
    router.navigate(['/doctors']);
    return EMPTY;
  }

  return doctorService.getDoctorById(id).pipe(
    catchError(() => {
      router.navigate(['/doctors']);
      return EMPTY;
    })
  );
};
