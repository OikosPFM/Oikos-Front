import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventosService } from '../../../services/eventos/eventos.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css'],
  providers: [EventosService],
})
export class EventModalComponent {
  @Input() event: any;
  @Output() close = new EventEmitter<void>();
  constructor(private eventosService: EventosService) {}
  ngOnInit(): void {
    console.log(this.event);
    console.log(this.event._def.publicId);
  }
  onClose() {
    this.close.emit();
  }

  deleteEvent(): void {
    if (this.event && this.event._def.publicId) {
      this.eventosService.deleteEventos(this.event._def.publicId).subscribe({
        next: (data: any) => {
          console.log('Evento eliminado con éxito', data);
          this.onClose(); // Cerrar el modal después de eliminar el evento
        },
        error: (error: any) => {
          console.error('Error al eliminar el evento', error);
        },
      });
    } else {
      console.error('No hay un ID de evento válido para eliminar');
    }
  }
}
