import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

//Importamos lo necesario para utilizar los servicios
//Después habrá que ponerlos en el provider e instanciarlos en el constructor
import { HttpClientModule } from '@angular/common/http';
import { TareasService } from '../../../../services/tarea/tareas.service';
import { InstalacionesService } from '../../../../services/instalaciones/instalaciones.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-create-tarea-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, DatePipe],
  templateUrl: './create-tarea-modal.component.html',
  styleUrl: './create-tarea-modal.component.css',
  providers: [TareasService, InstalacionesService, DatePipe],
})
export class CreateTareaModalComponent {
  //Recibimos del padre(Donde usemos este modal) el selectDate y le enviamos el método para cerrarlo
  @Output() close = new EventEmitter<void>();
  @Output() eventoCreado: EventEmitter<void> = new EventEmitter<void>();
  @Input() selectedDate: Date | undefined;
  @Output() eventoCreado: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private tareasService: TareasService,
    private instalacionesService: InstalacionesService,
    private datePipe: DatePipe
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.decoded = jwtDecode(token);
    } else {
      console.error('Token not found in localStorage');
    }
  }
  instalaciones: any[] = [];
  decoded: any | null;

  tarea = {
    instalacion: {
      idInstalacion: '',
    },
    nombre: '',
    descripcion: '',
    fecha: '',
    duracion: '',
    usuarioAsignado: null,
    tareaAcabada: false,
  };

  ngOnInit(): void {
    this.getInstalaciones();
    if (this.selectedDate) {
      this.tarea.fecha =
        this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd') || '';
    }
  }

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

  createTarea(tareaForm: NgForm): void {
    console.log(this.tarea);
    if (tareaForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    this.tareasService.createTarea(this.tarea, this.decoded).subscribe({
      next: (data: any) => {
        console.log('Tarea created successfully', data);
        alert(
          `La tarea con nombre:  ${this.tarea.nombre}, fecha: ${this.tarea.fecha}, duración: ${this.tarea.duracion},
          descripcion: ${this.tarea.descripcion}, instalacion: ${this.tarea.instalacion},
          con usuario asignado: ${this.tarea.usuarioAsignado} ha sido creada exitosamente.`
        );
        this.onClose(); // Cerrar el modal después de eliminar el evento
        this.eventoCreado.emit();
      },
      error: (error: any) => {
        console.log(this.tarea);
        console.error(alert('rrrrr'), tareaForm.resetForm(), error);
      },
    });
  }

  onClose() {
    this.close.emit();
  }
}
