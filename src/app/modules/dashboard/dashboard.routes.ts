import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MyProfilePage } from './pages/my-profile/my-profile';
import { MyAppointmentsPage } from './pages/my-appointments/my-appointments';
import { AllAppointmentsPage } from './pages/all-appointments/all-appointments';
import { UserManagementPage } from './pages/user-management/user-management';
import { roleGuardFn } from '../../core/guards/role.guard';

export default [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: MyProfilePage,
      },
      {
        path: 'appointments',
        component: MyAppointmentsPage,
      },
      {
        path: 'all-appointments',
        component: AllAppointmentsPage,
        canActivate: [roleGuardFn(['admin', 'receptionist'])],
      },
      {
        path: 'user-management',
        component: UserManagementPage,
        canActivate: [roleGuardFn(['admin', 'receptionist'])],
      },
    ],
  },
] as Routes;
