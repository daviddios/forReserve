import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'appointments',
    loadComponent: () => import('./pages/appointments/appointments.page').then( m => m.AppointmentsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  // {
  //   path: 'home',
  //   loadComponent: () =>
  //     import('./pages/home/home.page').then((m) => m.HomePage),
  // },
  // {
  //   path: 'service-details/:place_id',
  //   loadComponent: () =>
  //     import('./pages/service-details/service-details.page').then( m => m.ServiceDetailsPage)
  // },
];
