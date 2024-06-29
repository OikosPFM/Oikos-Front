import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TareasService } from '../../../../services/tarea/tareas.service';
import { InstalacionesService } from '../../../../services/instalaciones/instalaciones.service';
import { jwtDecode } from 'jwt-decode';
import { CreateTareaModalComponent } from '../create-tarea-modal/create-tarea-modal.component';


@Component({
  selector: 'app-tarea-modal',
  standalone: true,

  imports: [
    FormsModule,
    CommonModule,
    CreateTareaModalComponent,
    HttpClientModule,
    DatePipe,
    FullCalendarModule, 
    CalendarComponent
  ],

  templateUrl: './tarea-modal.component.html',
  providers: [DatePipe],
  styleUrl: './tarea-modal.component.css',
})
export class TareaModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() selectedDate: Date | undefined;

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

  decoded: any | null;
  instalaciones: any[] = [];
  tareas: any[] = [];
  editando: boolean = false;

  tarea = {
    idTarea: '',
    instalacion: {
      idInstalacion: '',
    },
    nombre: '',
    descripcion: '',
    fecha: '',
    duracion: '',
    usuarioAsignado: { idUsuario: '' },
    tareaAcabada: false,
  };
  isEditing: boolean = false;
  ngOnInit(): void {
    this.getInstalaciones();
    this.getTareas();
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
  getTareas(): void {
    this.tareasService.getTareas().subscribe(
      (data) => {
        this.tareas = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener las fincas', error);
      }
    );
  }

  onClose() {
    this.close.emit();
  }

  deleteTarea(id: string): void {
    this.tareasService.deleteTarea(id, this.decoded).subscribe({
      next: (data: any) => {
        console.log('Tarea eliminada con éxito', data);
        this.getTareas();
      },
      error: (error: any) => {
        console.error('Error al eliminar la tarea', error);
      },
    });

    console.log(this.tareas);
  }

  tareaEditando: any = null;

  startEditing(tarea: any): void {
    if (tarea) {
      this.tareaEditando = {
        idTarea: tarea.idTarea,
        instalacion: tarea.instalacion,
        nombre: tarea.nombre,
        descripcion: tarea.descripcion,
        fecha: tarea.fecha,
        duracion: tarea.duracion,
        tareaAcabada: tarea.tareaAcabada,
      };
      this.isEditing = true;
    }
  }
  cancelEditing(): void {
    this.tareaEditando = null;
    this.isEditing = false;
  }
  updateTarea(tareaForm: NgForm): void {
    if (tareaForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    const tareaToUpdate = {
      idTarea: this.tareaEditando.idTarea,
      instalacion: {
        idInstalacion: this.tareaEditando.instalacion.idInstalacion,
      },
      nombre: this.tareaEditando.nombre,
      descripcion: this.tareaEditando.descripcion,
      fecha: this.tareaEditando.fecha,
      duracion: this.tareaEditando.duracion,
      tareaAcabada: this.tareaEditando.tareaAcabada,
    };
    // Lógica para actualizar la instalación...
    console.log(tareaToUpdate);
    this.tareasService.updateTarea(tareaToUpdate, this.decoded).subscribe({
      next: (data) => {
        console.log('Tarea actualizada con éxito', data);
        this.getTareas();
        this.isEditing = false;

        alert(
          `La instalación con ID: ${this.tarea.idTarea} ha sido actualizada`
        );
      },
      error: (error) => {
        console.error(
          `Error al actualizar la tarea ${this.tareaEditando}`,
          error
        );
      },
    });
  }
}
