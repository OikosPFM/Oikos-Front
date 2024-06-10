import { Component } from '@angular/core';
import { FullcalendarComponent } from '../../layout/main/fullcalendar/fullcalendar.component';
import { CreateEventModalComponent } from '../../layout/create-event-modal/create-event-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FullcalendarComponent, CreateEventModalComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  showCreateEventModal: boolean = false;

  openCreateEventModal() {
    this.showCreateEventModal = true;
  }

  closeModal() {
    this.showCreateEventModal = false;
  }
}
