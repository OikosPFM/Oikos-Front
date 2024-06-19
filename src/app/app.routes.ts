import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { TareaModalComponent } from './components/layout/tareas/tarea-modal/tarea-modal.component';

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
    path: 'manage-tarea',
    component: TareaModalComponent,
  },
];
