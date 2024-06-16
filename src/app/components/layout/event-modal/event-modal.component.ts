import { InstalacionesService } from './../../../services/instalaciones/instalaciones.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventosService } from '../../../services/eventos/eventos.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css'],
  providers: [EventosService, InstalacionesService],
})
export class EventModalComponent {
  @Input() event: any;
  @Output() close = new EventEmitter<void>();
  @Output() eventoEliminado: EventEmitter<void> = new EventEmitter<void>();

  isEditing: boolean = false;

  constructor(
    private eventosService: EventosService,
    private instalacionesService: InstalacionesService
  ) {}

  evento = {
    idEvento: '',
    titulo: '',
    fecha: '',
    hora: '',
    descripcion: '',
    categoria: '',
    instalacion: {
      idInstalacion: '',
    },
    participantes: '',
    aforo: '',
    /*organizador: {
      idUsuario: '',
    },*/
  };

  ngOnInit(): void {
    this.getInstalaciones();
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
          this.eventoEliminado.emit(); // Emitir el evento después de que la eliminación sea exitosa
        },
        error: (error: any) => {
          console.error('Error al eliminar el evento', error);
        },
      });
    } else {
      console.error('No hay un ID de evento válido para eliminar');
    }
    this.eventoEliminado.emit();
  }

  instalaciones: any[] = [];

  getInstalaciones(): void {
    this.instalacionesService.getAllInstalaciones().subscribe(
      (data) => {
        this.instalaciones = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener las fincas', error);
      }
    );
  }

  getEvento(idEvento: any): void {
    this.eventosService.getEventoById(idEvento).subscribe(
      (data) => {
        const instalacion = (this.evento.instalacion.idInstalacion =
          this.obtenerIdInstalacionPorIdEvento(
            this.instalaciones,
            this.event._def.publicId
          ));
        this.evento = { ...data, instalacion: { instalacionId: instalacion } };
        console.log('Evento:', this.evento);
        console.log('Evento:', this.evento);
      },
      (error) => {
        console.error('Error al obtener el evento:', error);
      }
    );
  }

  instalacionEditando: any = null;

  startEditing(event: any): void {
    this.isEditing = true;
    this.instalacionEditando = { ...event };
    this.getEvento(this.instalacionEditando._def.publicId);

    console.log(this.instalacionEditando);
    console.log(this.evento);
  }

  updateInstalacion(): void {
    console.log('hey');
  }

  obtenerIdInstalacionPorIdEvento(
    instalaciones: any[],
    idEventoBuscado: string
  ): string {
    for (const instalacion of instalaciones) {
      for (const evento of instalacion.eventos) {
        if (evento.idEvento == idEventoBuscado) {
          return instalacion.idInstalacion;
        }
      }
    }
    // Si el evento no se encuentra en ninguna instalación
    return '';
  }
}
