import { DoctorProfileDetailsComponent } from './components/doctor-profile-details/doctor-profile-details';
import { DoctorProfile } from './containers/doctor-profile/doctor-profile';
import { DoctorsComponent } from './doctors.component';
import { DoctorsList } from './pages/doctors-list/doctors-list';
import { doctorResolver } from './resolvers/doctor.resolver';

export default [
  {
    path: '',
    component: DoctorsComponent,
    children: [
      {
        path: '',
        component: DoctorsList,
        resolve: {},
      },
      {
        path: ':id',
        component: DoctorProfile,
        resolve: { doctor: doctorResolver },
      },
    ],
  },
];
