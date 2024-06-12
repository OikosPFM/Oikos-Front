import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

//Importamos lo necesario para utilizar los servicios
//Después habrá que ponerlos en el provider e instanciarlos en el constructor
import { HttpClientModule } from '@angular/common/http';
import { InstalacionesService } from '../../../services/instalaciones/instalaciones.service';
import { EventosService } from '../../../services/eventos/eventos.service';

@Component({
  selector: 'app-create-event-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, DatePipe],
  templateUrl: './create-event-modal.component.html',
  styleUrl: './create-event-modal.component.css',
  providers: [EventosService, InstalacionesService, DatePipe],
})
export class CreateEventModalComponent {
  //Recibimos del padre(Donde usemos este modal) el selectDate y le enviamos el método para cerrarlo
  @Output() close = new EventEmitter<void>();
  @Output() eventoCreado: EventEmitter<void> = new EventEmitter<void>();
  @Input() selectedDate: Date | undefined;

  constructor(
    private eventosService: EventosService,
    private instalacionesService: InstalacionesService,
    private datePipe: DatePipe
  ) {}

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
    /*organizador: {
      idUsuario: '',
    },*/
  };

  ngOnInit(): void {
    //Al iniciar el componente
    //get de instalaciones para que nos muestre en el formulario
    this.getInstalaciones();
    //Si se ha seleccionado una fecha en el calendario añadimos tal fecha al formulario
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
    if (eventoForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    // Asigna el ID del organizador al objeto evento, tendremos que hacer un get del usuario
    //this.evento.organizadorId = userId;

    this.eventosService.createEventos(this.evento).subscribe({
      next: (data: any) => {
        console.log('Evento created successfully', data);
        alert(
          `El evento es:  ${this.evento.titulo}, fecha: ${this.evento.fecha}, hora: ${this.evento.hora},
          descripcion: ${this.evento.descripcion}, categoria: ${this.evento.categoria},
          participantes: ${this.evento.participantes}, aforo: ${this.evento.aforo} ha sido creado exitosamente.`
        );
        this.onClose(); // Cerrar el modal después de eliminar el evento
        this.eventoCreado.emit(); // Emitir el evento después de que la eliminación sea exitosa
      },
      error: (error: any) => {
        console.error('Error al crear el evento', error);
      },
    });
  }

  onClose() {
    this.close.emit();
  }
}
