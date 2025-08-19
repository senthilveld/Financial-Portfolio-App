import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'investments',
    loadComponent: () => import('./features/investments/investment-list.component').then(m => m.InvestmentListComponent)
  },
  {
    path: 'investments/new',
    loadComponent: () => import('./features/investments').then(m => m.InvestmentFormComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
