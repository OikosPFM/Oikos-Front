import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { EventModalComponent } from '../../event-modal/event-modal.component';
import { CreateEventModalComponent } from '../../create-event-modal/create-event-modal.component';
import { INITIAL_EVENTS, createEventId } from './../../../../utils/event-utils';
import { CommonModule } from '@angular/common';
import { EventosService } from '../../../../services/eventos/eventos.service';
import { TareasService } from '../../../../services/tarea/tareas.service';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import esLocale from '@fullcalendar/core/locales/es'; // Importa el idioma que necesitas

@Component({
  selector: 'app-fullcalendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    EventModalComponent,
    CreateEventModalComponent,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './fullcalendar.component.html',
  styleUrl: './fullcalendar.component.css',
  providers: [EventosService],
})
export class FullcalendarComponent {
  showCreateEventModal: boolean = false;
  selectedDate: Date | undefined;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private eventosService: EventosService,
    private tareasService: TareasService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.decoded = jwtDecode(token);
    } else {
      console.error('Token not found in localStorage');
    }
  }

  ngOnInit(): void {
    this.getEventosByFincaId(this.decoded.idFinca);
    this.getFilteredTareas();
  }
  eventos: any[] = [];
  tareas: any[] = [];
  tareasProcesadas: any[] = [];
  procesados: any[] = [];
  decoded: any | null;
  eventosTareasJuntos: any[] = [];
  combineEvents(): void {
    this.eventosTareasJuntos = [...this.procesados, ...this.tareasProcesadas];
  }
  getFilteredTareas(): void {
    this.tareasService.getTareas().subscribe(
      (data) => {
        this.tareas = data;
        console.log(data);
        this.filterTareasByFincaID();
        this.filterTareasByUsuarioID();
        const gestionadas = this.tareas.map((tarea: any) => ({
          id: tarea.idTarea,
          facilites: tarea.instalacion.idInstalacion,
          title: tarea.nombre,
          description: tarea.descripcion,
          start: this.formatDateArray(tarea.fecha),
          duration: tarea.duracion,
          organizer: `${tarea.usuarioAsignado?.nombre} ${tarea.usuarioAsignado?.primerApellido} ${tarea.usuarioAsignado?.segundoApellido}`,
          color: 'green',
        }));
        this.tareasProcesadas = gestionadas;
        console.log('tareas procesadas', this.tareasProcesadas);
        this.combineEvents();
        this.calendarOptions.update((options) => ({
          ...options,
          eventSources: [{ events: this.eventosTareasJuntos }],
        }));
        console.log();
        console.log('Filtered Tareas', this.tareas);
      },
      (error) => {
        console.error('Error al obtener las tareas', error);
      }
    );
  }
  filterTareasByFincaID(): void {
    this.tareas = this.tareas.filter(
      (tarea) => tarea.instalacion.finca.idFinca == this.decoded.idFinca
    );
    console.log('filtrado por finca');
  }
  filterTareasByUsuarioID(): void {
    this.tareas = this.tareas.filter(
      (tarea) => tarea.usuarioAsignado.idUsuario == this.decoded.idUsuario
    );
  }
  // Actualizar las opciones del calendario con los eventos procesados
  //      eventSources: [{ events: this.procesados, color: 'pink' }],

  getEventosByFincaId(fincaId: number): void {
    this.eventosService.getEventosByFincaId(fincaId).subscribe(
      (data) => {
        this.eventos = data;
        const eventosProcesadas = data.map((evento: any) => ({
          id: evento.idEvento,
          title: evento.titulo,
          start: `${evento.fecha}T${evento.hora}`,
          description: evento.descripcion,
          category: evento.categoria,
          dates: evento.fecha,
          time: evento.hora,
          capacity: evento.aforo,
          organizer: `${evento.organizador?.nombre} ${evento.organizador?.primerApellido} ${evento.organizador?.segundoApellido}`,
          color: 'pink',
        }));
        this.procesados = eventosProcesadas;
        console.log(this.eventos);
        console.log(this.procesados);

        // Actualizar las opciones del calendario con los eventos procesados
        this.combineEvents();
        this.calendarOptions.update((options) => ({
          ...options,
          eventSources: [{ events: this.eventosTareasJuntos }],
        }));
        console.log();
        console.log('Filtered Tareas', this.tareas);
      },
      (error) => {
        console.error('Error al obtener los eventos por ID de finca', error);
      }
    );
  }

  selectedEvent: any = null;
  currentEvents = signal<EventApi[]>([]);
  calendarVisible = signal(true);

  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    displayEventTime: false,
    showNonCurrentDates: false,
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    locale: esLocale, // Configura el idioma aquí
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventDisplay: 'block',
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
    events: [
      { title: 'event 1', start: '2024-05-02' },
      { title: 'event 2', start: '2024-05-02' },
    ],
  });
  handleEventClick(clickInfo: EventClickArg): void {
    this.selectedEvent = clickInfo.event;
    console.log(this.selectedEvent);
  }
  closeModal(): void {
    this.selectedEvent = null;
    this.showCreateEventModal = false;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const eventsInDay = selectInfo.view.calendar.getEvents;
    if (eventsInDay.length === 0) {
      this.showCreateEventModal = true;
    }
    this.selectedDate = selectInfo.start;
    console.log(this.selectedDate);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  onEventoEliminado(): void {
    this.getEventosByFincaId(this.decoded.idFinca);
  }

  onEventoCreado(): void {
    this.getEventosByFincaId(this.decoded.idFinca);
  }

  onEventoEditado(): void {
    this.getEventosByFincaId(this.decoded.idFinca);
  }
  formatDateArray(dateArray: [number, number, number]): string {
    // Destructure the array into year, month, and day
    const [year, month, day] = dateArray;

    // Create a Date object from the array. Note: months are zero-based in JavaScript Date.
    const date = new Date(year, month - 1, day, 12, 0); // Set hours to 12 and minutes to 0

    // Extract parts of the date
    const formattedYear = date.getFullYear();
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-based
    const formattedDay = String(date.getDate()).padStart(2, '0');
    const formattedHours = String(date.getHours()).padStart(2, '0');
    const formattedMinutes = String(date.getMinutes()).padStart(2, '0');

    // Format the date string
    return `${formattedYear}-${formattedMonth}-${formattedDay}T${formattedHours}:${formattedMinutes}`;
  }
}
