import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TareasService } from '../../../../services/tarea/tareas.service';
import { InstalacionesService } from '../../../../services/instalaciones/instalaciones.service';

@Component({
  selector: 'app-tarea-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, DatePipe],
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
  ) {}

  instalaciones: any[] = [];
  tareas: any[] = [];
  editando = false;

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

  createTarea(tareaForm: NgForm): void {
    if (tareaForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    this.tareasService.createTarea(this.tarea).subscribe({
      next: (data: any) => {
        console.log('Tarea created successfully', data);
        alert(
          `La tarea con nombre:  ${this.tarea.nombre}, fecha: ${this.tarea.fecha}, duración: ${this.tarea.duracion},
          descripcion: ${this.tarea.descripcion}, instalacion: ${this.tarea.instalacion},
          con usuario asignado: ${this.tarea.usuarioAsignado} ha sido creada exitosamente.`
        );
        tareaForm.resetForm();
      },
      error: (error: any) => {
        console.error(alert(), tareaForm.resetForm(), error);
      },
    });
  }

  onClose() {
    this.close.emit();
  }

  deleteTarea(id: string): void {
    this.tareasService.deleteTarea(id).subscribe({
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
    this.tareaEditando = { ...tarea };
    console.log(this.tareaEditando);
    this.isEditing = true;
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
    // Lógica para actualizar la instalación...
    this.tareasService.updateTarea(this.tareaEditando).subscribe({
      next: (data) => {
        console.log('Tarea actualizada con éxito', data);
        this.getTareas();
        this.isEditing = false;

        alert(
          `La instalación con ID: ${this.tarea.idTarea} ha sido actualizada`
        );
      },
      error: (error) => {
        console.error('Error al actualizar la instalación', error);
      },
    });
  }
}