import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.routes'),
  },
  {
    path: 'doctors',
    loadChildren: () => import('./modules/doctors/doctors.routes'),
  },
];
