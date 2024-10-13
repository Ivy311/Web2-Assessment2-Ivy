import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user',
    loadComponent: () => import("./user/user.component").then(m => m.UserComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./user/startUp/startUp.component').then(m => m.StartUpComponent)
      },
      {
        path: 'home',
        loadComponent: () => import('./user/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'fundraiser',
        loadComponent: () => import('./user/fundraiser/fundraiser.component').then(m => m.FundraiserComponent)
      },
      {
        path: 'detail',
        loadComponent: () => import('./user/detail/detail.component').then(m => m.DetailComponent)
      },
      {
        path: 'donation',
        loadComponent: () => import('./user/donation/donation.component').then(m => m.DonationComponent)
      }
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import("./admin/admin.component").then(m => m.AdminComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./admin/list/list.component').then(m => m.ListComponent)
      },
      {
        path: 'detail',
        loadComponent: () => import('./admin/adminDetail/adminDetail.component').then(m => m.AdminDetailComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/user'
  }
];
