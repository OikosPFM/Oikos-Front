import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

// Importamos lo necesario para utilizar los servicios
import { HttpClientModule } from '@angular/common/http';
import { TareasService } from '../../../../services/tarea/tareas.service';
import { InstalacionesService } from '../../../../services/instalaciones/instalaciones.service';
import { jwtDecode } from 'jwt-decode';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-create-tarea-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, DatePipe],
  templateUrl: './create-tarea-modal.component.html',
  styleUrls: ['./create-tarea-modal.component.css'],
  providers: [TareasService, InstalacionesService, DatePipe],
})
export class CreateTareaModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() tareaCreada: EventEmitter<void> = new EventEmitter<void>();
  @Input() selectedDate: Date | undefined;

  usuarios: any[] = [];
  instalaciones: any[] = [];
  decoded: any | null = null;

  tarea = {
    instalacion: {
      idInstalacion: '',
    },
    nombre: '',
    descripcion: '',
    fecha: '',
    duracion: '',
    usuarioAsignado: {
      idUsuario: '',
    },
    tareaAcabada: false,
  };

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

  ngOnInit(): void {
    this.getInstalaciones();
    this.getUsuarios();
    if (this.selectedDate) {
      this.tarea.fecha =
        this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd') || '';
    }
  }

  getInstalaciones(): void {
    this.instalacionesService.getAllInstalaciones().subscribe(
      (data) => {
        this.instalaciones = data;
      },
      (error) => {
        console.error('Error al obtener las instalaciones', error);
      }
    );
  }
  getUsuarios(): void {
    this.usuariosService.getUsuariosByFinca(this.decoded).subscribe(
      (data) => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      (error) => {
        console.error(error);
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
        alert(`La tarea ha sido creada exitosamente.`);
        this.onClose();
        this.tareaCreada.emit();
      },
      error: (error: any) => {
        console.error('Error al crear la tarea', error);
        console.log(this.tarea);
      },
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
