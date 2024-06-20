import { Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { EntradaForoComponent } from './components/pages/foro/entrada-foro/entrada-foro.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path:'entrada-foro',
    component: EntradaForoComponent,
  },
];
