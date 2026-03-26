import { DoctorCreate } from './containers/doctor-create/doctor-create';
import { DoctorEdit } from './containers/doctor-edit/doctor-edit';
import { DoctorProfile } from './containers/doctor-profile/doctor-profile';
import { DoctorsComponent } from './doctors.component';
import { DoctorsList } from './pages/doctors-list/doctors-list';
import { doctorResolver } from './resolvers/doctor.resolver';
import { authGuardFn } from '@auth0/auth0-angular';
import { roleGuardFn } from '../../core/guards/role.guard';

const STAFF_ROLES = ['admin', 'receptionist'];

export default [
  {
    path: '',
    component: DoctorsComponent,
    children: [
      {
        path: '',
        component: DoctorsList,
      },
      {
        path: 'create',
        canActivate: [authGuardFn, roleGuardFn(STAFF_ROLES)],
        component: DoctorCreate,
      },
      {
        path: 'edit/:id',
        canActivate: [authGuardFn, roleGuardFn(STAFF_ROLES)],
        component: DoctorEdit,
        resolve: { doctor: doctorResolver },
      },
      {
        path: ':id',
        canActivate: [authGuardFn],
        component: DoctorProfile,
        resolve: { doctor: doctorResolver },
      },
    ],
  },
];
