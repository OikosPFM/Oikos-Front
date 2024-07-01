import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { InstalacionesService } from '../../../services/instalaciones/instalaciones.service';
import { EventosService } from '../../../services/eventos/eventos.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-create-event-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, DatePipe],
  templateUrl: './create-event-modal.component.html',
  styleUrl: './create-event-modal.component.css',
  providers: [EventosService, InstalacionesService, DatePipe],
})
export class CreateEventModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() eventoCreado: EventEmitter<void> = new EventEmitter<void>();
  @Input() selectedDate: Date | undefined;

  constructor(
    private eventosService: EventosService,
    private instalacionesService: InstalacionesService,
    private datePipe: DatePipe
  ) {
    {
      const token = localStorage.getItem('token');
      if (token) {
        this.decoded = jwtDecode(token);
        this.evento.finca.idFinca = this.decoded.idFinca;
      } else {
        console.error('Token not found in localStorage');
      }
    }
  }
  decoded: any | null;

  evento = {
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
    finca: {
      idFinca: '',
    },
  };

  ngOnInit(): void {
    this.getInstalaciones();

    if (this.selectedDate) {
      this.evento.fecha =
        this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd') || '';
    }
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

  createEventos(eventoForm: NgForm): void {
    console.log(this.evento);
    if (eventoForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    this.eventosService.createEventos(this.evento, this.decoded).subscribe({
      next: (data: any) => {
        console.log('Evento created successfully', data);
        console.log(data);
        alert(
          `El evento es:  ${this.evento.titulo}, fecha: ${this.evento.fecha}, hora: ${this.evento.hora},
          descripcion: ${this.evento.descripcion}, categoria: ${this.evento.categoria},
          participantes: ${this.evento.participantes}, aforo: ${this.evento.aforo} ha sido creado exitosamente. ${this.evento.instalacion.idInstalacion}`
        );
        this.onClose();
        this.eventoCreado.emit();
      },
      error: (error: any) => {
        console.error('Error al crear el evento', error);
      },
    });
  }

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.onClose();
    }
  }
}
