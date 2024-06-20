import { Component, OnInit, OnDestroy } from '@angular/core';
import { FullcalendarComponent } from '../../layout/main/fullcalendar/fullcalendar.component';
import { CreateEventModalComponent } from '../../layout/create-event-modal/create-event-modal.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/auth/loginRequest';
import { User } from '../../../services/auth/user';

import { ManageInstalacionesComponent } from '../../layout/manage-instalaciones-modal/manage-instalaciones-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FullcalendarComponent,
    CreateEventModalComponent,
    ManageInstalacionesComponent,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  showCreateEventModal: boolean = false;
  showManageInstalacionesModal: boolean = false;

  openCreateEventModal() {
    this.showCreateEventModal = true;
  }

  openManageInstalacionesModal() {
    this.showManageInstalacionesModal = true;
  }

  closeModal() {
    this.showCreateEventModal = false;
    this.showManageInstalacionesModal = false;
  }
}
