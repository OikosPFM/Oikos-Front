import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // Importar el módulo de FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Importar el plugin de vista de cuadrícula de día
import interactionPlugin from '@fullcalendar/interaction'; // Importar el plugin de interacción

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [
      { title: 'Event 1', date: '2023-06-01' },
      { title: 'Event 2', date: '2023-06-05' }
    ],
    dateClick: this.handleDateClick.bind(this)
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }
}

