import { Component, Input } from '@angular/core';
import { TareasService } from '../../../../services/tarea/tareas.service';
import { InstalacionesService } from '../../../../services/instalaciones/instalaciones.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
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
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.decoded = jwtDecode(token);
    } else {
      console.error('Token not found in localStorage');
    }
  }

  instalaciones: any[] = [];
  tareas: any[] = [];
  decoded: any | null;

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

  autoAsignacion(usuario: any, tarea: any): void {
    const updatedTarea = {
      ...tarea,
      usuarioAsignado: {
        idUsuario: usuario.idUsuario,
        dni: usuario.dni,
        nombre: usuario.nombre,
        primerApellido: usuario.primerApellido,
        segundoApellido: usuario.segundoApellido,
        email: usuario.email,
        contraseña: usuario.contraseña,
        telefono: usuario.telefono,
        roles: usuario.roles,
      },
    };
    this.tareasService.updateTarea(updatedTarea).subscribe({
      next: (data) => {
        console.log('Usuario asignado actualizado con éxito', data);
        this.getTareas();

        alert(
          `El usuario con ID: ${usuario.idUsuario} ha sido asignado a la tarea con ID: ${tarea.idTarea}`
        );
      },
      error: (error) => {
        console.error(
          'Error al actualizar el usuario asignado: ' + updatedTarea,
          error
        );
      },
    });
  }

  desasignarTarea(tarea: any): void {
    const updatedTarea = {
      ...tarea,
      usuarioAsignado: null,
    };
    this.tareasService.updateTarea(updatedTarea).subscribe({
      next: (data) => {
        console.log('Usuario desasignado con éxito', data);
        this.getTareas();

        alert(
          `La tarea con ID: ${tarea.idTarea} ya no está asignada a ningún usuario`
        );
      },
      error: (error) => {
        console.error(
          'Error al actualizar el usuario asignado: ' + updatedTarea,
          error
        );
      },
    });
  }

  cambiarEstadoTarea(tarea: any): void {
    this.tareasService.updateEstadoTarea(tarea.idTarea).subscribe({
      next: (data) => {
        console.log('Usuario desasignado con éxito', data);
        this.getTareas();
        alert(
          `El Estado de la tarea con ID: ${tarea.idTarea} ahora es: ${tarea.tareaAcabada}`
        );
      },
      error: (error) => {
        console.error(
          'Error al actualizar el usuario asignado: ' + tarea,
          error
        );
      },
    });
  }
}
