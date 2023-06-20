import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/auth/signin/signin.page').then( m => m.SigninComponent)
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'forget-password',
    loadComponent: () => import('./pages/auth/forget-password/forget-password.page').then( m => m.ForgetPasswordPage)
  }
];
