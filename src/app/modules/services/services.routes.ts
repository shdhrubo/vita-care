import { ServicesComponent } from './services.component';
import { ServicesListing } from './containers/services-listing/services-listing';
import { ServiceDetail } from './containers/service-detail/service-detail';

export default [
  {
    path: '',
    component: ServicesComponent,
    children: [
      {
        path: '',
        component: ServicesListing,
      },
      {
        path: ':id',
        component: ServiceDetail,
      },
    ],
  },
];
