import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ContactComponent } from './components/pages/contactUs/contacta.component';
import { AboutComponent } from './components/pages/aboutUs/about.component';
//import { EmailFormComponent } from './components/pages/contactUs/email-form/email-form.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TareaModalComponent } from './components/layout/tareas/tarea-modal/tarea-modal.component';
import { TareaAsignacionComponent } from './components/layout/tareas/tarea-asignacion/tarea-asignacion.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contacta',
    component: ContactComponent,
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'manage-tarea',
    component: TareaModalComponent,
  },
  {
    path: 'asignacion-tarea',
    component: TareaAsignacionComponent,
  },
];

/*@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}*/
