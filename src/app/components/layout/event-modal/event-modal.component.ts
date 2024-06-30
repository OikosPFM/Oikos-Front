import { InstalacionesService } from './../../../services/instalaciones/instalaciones.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventosService } from '../../../services/eventos/eventos.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

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
  @Output() eventoEditado: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventoCreado: EventEmitter<void> = new EventEmitter<void>();

  isEditing: boolean = false;

  constructor(
    private eventosService: EventosService,
    private instalacionesService: InstalacionesService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.decoded = jwtDecode(token);
    } else {
      console.error('Token not found in localStorage');
    }
  }
  decoded: any | null;

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
      this.eventosService
        .deleteEventos(this.event._def.publicId, this.decoded)
        .subscribe({
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
    this.instalacionesService
      .getInstalacionesByFincaID(this.decoded.idFinca)
      .subscribe(
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
        this.evento = {
          idEvento: data.idEvento,
          titulo: data.titulo,
          fecha: data.fecha,
          hora: data.hora,
          descripcion: data.descripcion,
          categoria: data.categoria,
          instalacion: {
            idInstalacion: data.instalacion.idInstalacion,
          },
          participantes: data.participantes,
          aforo: data.aforo,
        };

        console.log('Evento:', this.evento);
        console.log('Evento:', this.evento);
      },
      (error) => {
        console.error('Error al obtener el evento:', error);
      }
    );
  }

  eventoEditando: any = null;

  startEditing(event: any): void {
    this.isEditing = true;
    this.eventoEditando = { ...event };
    console.log(this.eventoEditando._def.publicId);
    this.getEvento(this.eventoEditando._def.publicId);
  }

  updateEvento(eventoForm: NgForm): void {
    if (eventoForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    // Lógica para actualizar el evento...
    this.eventosService.updateEvento(this.evento, this.decoded).subscribe({
      next: (data) => {
        console.log('Evento actualizado con éxito', data);
        this.isEditing = false;
        this.onClose(); // Cerrar el modal después de eliminar el evento
        this.eventoEditado.emit(this.eventoEditando); // Asegúrate de tener definido eventoEditado como EventEmitter en el componente

        alert(
          `El evento con ID: ${this.eventoEditando._def.publicId} ha sido actualizado`
        );
      },
      error: (error) => {
        console.error('Error al actualizar el evento', error);
      },
    });
  }

  onBackdropClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.onClose();
    }
  }

  getFacilityName(facilityId: string): string {
    const facility = this.instalaciones.find(
      (instalacion) => instalacion.idInstalacion === facilityId
    );
    return facility ? facility.nombre : 'Desconocido';
  }
  /*obtenerIdInstalacionPorIdEvento(
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
  }*/
}
