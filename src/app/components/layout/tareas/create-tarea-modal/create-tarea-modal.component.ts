import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

//Importamos lo necesario para utilizar los servicios
//Después habrá que ponerlos en el provider e instanciarlos en el constructor
import { HttpClientModule } from '@angular/common/http';
import { TareasService } from '../../../../services/tarea/tareas.service';
import { InstalacionesService } from '../../../../services/instalaciones/instalaciones.service';

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
    usuarioAsignado: null,
    tareaAcabada: false,
  };

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
}
