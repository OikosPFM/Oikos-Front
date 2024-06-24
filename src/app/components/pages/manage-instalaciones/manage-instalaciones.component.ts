import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InstalacionesService } from '../../../services/instalaciones/instalaciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Router, RouterModule } from '@angular/router';
import { CreateInstalacionComponent } from '../../layout/modals/create-instalacion/create-instalacion.component';
import { EditInstalacionComponent } from '../../layout/modals/edit-instalacion/edit-instalacion.component';

@Component({
  selector: 'app-manage-instalaciones',
  standalone: true,
  templateUrl: './manage-instalaciones.component.html',
  styleUrl: './manage-instalaciones.component.css',
  providers: [InstalacionesService],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    CreateInstalacionComponent,
    EditInstalacionComponent,
  ],
})
export class ManageInstalacionesComponent {
  editando = false;
  diasSemana = [
    'LUNES',
    'MARTES',
    'MIERCOLES',
    'JUEVES',
    'VIERNES',
    'SABADO',
    'DOMINGO',
  ];
  showCreateInstalacionModal: boolean = false;
  showEditInstalacionModal: boolean = false;

  constructor(private instalacionesService: InstalacionesService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.decoded = jwtDecode(token);
      // Ahora puedes usar this.decoded de manera segura
      this.instalacion.finca.idFinca = this.decoded.idFinca;
    } else {
      console.error('Token not found in localStorage');
    }
  }

  decoded: any | null;
  instalaciones: any[] = [];
  instalacion = {
    //Más adelante habrá que conectar con la finca que se este gestionando
    finca: {
      idFinca: '',
    },
    nombre: '',
    diasAbierto: [] as string[],
    horarioApertura: '',
    horarioCierre: '',
    intervalo: '',
    plazasIntervalo: '',
    invitacionesMensualesMaximas: '',
    idInstalacion: '',
  };

  isEditing: boolean = false;

  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    this.obtenerInstalacionesPorFincaID(this.decoded.idFinca);
  }
  getInstalaciones(): void {
    this.instalacionesService.getAllInstalaciones().subscribe((data) => {
      this.instalaciones = data;
      console.log(this.instalaciones);
    });
  }

  obtenerInstalacionesPorFincaID(fincaID: number): void {
    this.instalacionesService.getInstalacionesByFincaID(fincaID).subscribe(
      (data) => {
        this.instalaciones = data;
        console.log('Instalaciones:', this.instalaciones);
      },
      (error) => {
        console.error('Error al obtener instalaciones:', error);
      }
    );
  }

  onClose() {
    this.close.emit();
  }

  onDiasAbiertoChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.instalacion.diasAbierto.push(checkbox.value);
    } else {
      const index = this.instalacion.diasAbierto.indexOf(checkbox.value);
      if (index > -1) {
        this.instalacion.diasAbierto.splice(index, 1);
      }
    }
  }

  createInstalacion(instalacionForm: NgForm): void {
    if (instalacionForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    // Asigna el ID del organizador al objeto evento, tendremos que hacer un get del usuario
    //this.evento.organizadorId = userId;

    this.instalacionesService
      .createInstalaciones(this.instalacion, this.decoded)
      .subscribe({
        next: (data: any) => {
          console.log('Evento created successfully', data);
          alert(
            `La instalación ha sido creada exitosamente. 
Finca: ${this.instalacion.finca.idFinca}, 
Nombre: ${this.instalacion.nombre}, 
Días abierto: ${this.instalacion.diasAbierto.join(', ')}, 
Horario de apertura: ${this.instalacion.horarioApertura}, 
Horario de cierre: ${this.instalacion.horarioCierre}, 
Intervalo: ${this.instalacion.intervalo}, 
Plazas por intervalo: ${this.instalacion.plazasIntervalo}, 
Invitaciones mensuales máximas: ${
              this.instalacion.invitacionesMensualesMaximas
            }.`
          );
          instalacionForm.resetForm();
          this.getInstalaciones();
        },
        error: (error: any) => {
          console.error('Error al crear el evento', error);
        },
      });

    console.log(this.instalaciones);
  }

  deleteInstalacion(idInstalacion: string): void {
    this.instalacionesService
      .deleteInstalacion(idInstalacion, this.decoded)
      .subscribe(
        (data) => {
          console.log('Instalación eliminada correctamente:', data);
          this.getInstalaciones();

          // Actualiza la lista de instalaciones o realiza otra acción necesaria
        },
        (error) => {
          console.error('Error al eliminar instalación:', error);
          // Maneja el error de acuerdo a tus necesidades (mostrar mensaje al usuario, etc.)
        }
      );
  }

  instalacionEditando: any = null;

  startEditing(instalacion: any): void {
    if (instalacion) {
      // Copiar cada campo uno por uno según sea necesario
      this.instalacionEditando = {
        nombre: instalacion.nombre,
        diasAbierto: [...instalacion.diasAbierto],
        horarioApertura: instalacion.horarioApertura,
        horarioCierre: instalacion.horarioCierre,
        intervalo: instalacion.intervalo,
        plazasIntervalo: instalacion.plazasIntervalo,
        invitacionesMensualesMaximas: instalacion.invitacionesMensualesMaximas,
        idInstalacion: instalacion.idInstalacion,
      };

      console.log(this.instalacionEditando);
      this.isEditing = true;
    } else {
      console.error('Instalación no válida para editar.');
    }
  }

  updateInstalacion(instalacionForm: NgForm): void {
    if (instalacionForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    // Lógica para actualizar la instalación...
    this.instalacionesService
      .updateInstalacion(this.instalacionEditando, this.decoded)
      .subscribe({
        next: (data) => {
          console.log('Instalación actualizada con éxito', data);
          this.getInstalaciones();
          this.isEditing = false;

          alert(
            `La instalación con ID: ${this.instalacion.idInstalacion} ha sido actualizada`
          );
        },
        error: (error) => {
          console.error('Error al actualizar la instalación', error);
        },
      });
  }

  cancelEditing(): void {
    this.instalacionEditando = null;
    this.isEditing = false;
  }

  closeModal() {
    this.showCreateInstalacionModal = false;
    this.showEditInstalacionModal = false;
  }

  openCreateInstalacionModal() {
    this.showCreateInstalacionModal = true;
  }

  openEditInstalacionModal() {
    this.showEditInstalacionModal = true;
  }
}
