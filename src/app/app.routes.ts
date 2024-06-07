import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CrearEventosComponent } from './components/pages/crear-eventos/crear-eventos.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'crear-eventos',
    component: CrearEventosComponent,
  },
];
