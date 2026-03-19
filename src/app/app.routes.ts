import { Routes } from '@angular/router';

import { authGuardFn } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.routes'),
  },
  {
    path: 'doctors',
    loadChildren: () => import('./modules/doctors/doctors.routes'),
  },
  {
    path: 'dashboard',
    canActivate: [authGuardFn],
    loadChildren: () => import('./modules/dashboard/dashboard.routes'),
  },
];
