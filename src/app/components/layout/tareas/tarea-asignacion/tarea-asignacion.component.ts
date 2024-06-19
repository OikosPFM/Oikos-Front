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
  usuario: any;

  // Call the service method and handle the response
  getUsuarioById(id: number): void {
    this.usuariosService.getUsuarioById(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario; // Assign the fetched data to the usuario variable
        console.log('Usuario fetched successfully', this.usuario);
      },
      error: (error) => {
        console.error('Error fetching usuario', error);
      },
    });
  }

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
    this.getUsuarioById(5);
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
    this.tareasService.patchTarea(tarea.idTarea, updatedTarea).subscribe({
      next: (data) => {
        console.log('Usuario asignado actualizado con éxito', data);
        this.getTareas();

        alert(
          `El usuario con ID: ${usuario.idUsuario} ha sido asignado a la tarea con ID: ${tarea.idTarea}`
        );
      },
      error: (error) => {
        console.error(
          'Error al actualizar el usuario asignado: ' +
            JSON.stringify(updatedTarea),
          error
        );
      },
    });
  }
}
