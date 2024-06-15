import { Component, Input } from '@angular/core';
import { TareasService } from '../../../../services/tarea/tareas.service';
import { InstalacionesService } from '../../../../services/instalaciones/instalaciones.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-tarea-asignacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './tarea-asignacion.component.html',
  providers: [DatePipe],
  styleUrl: './tarea-asignacion.component.css',
})
export class TareaAsignacionComponent {
  @Input() selectedDate: Date | undefined;
  constructor(
    private tareasService: TareasService,
    private instalacionesService: InstalacionesService,
    private usuariosService: UsuariosService,
    private datePipe: DatePipe
  ) {}

  instalaciones: any[] = [];
  tareas: any[] = [];
  usuarios: any[] = [];

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
        console.error('Error al obtener las instalaciones', error);
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
        console.error('Error al obtener las tareas', error);
      }
    );
  }
}
