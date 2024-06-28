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
  @Output() close = new EventEmitter<void>();

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
  ngOnInit(): void {
    this.obtenerInstalacionesPorFincaID(this.decoded.idFinca);
  }

  decoded: any | null;
  isEditing: boolean = false;
  instalacionEditando: any = null;
  showCreateInstalacionModal: boolean = false;
  showEditInstalacionModal: boolean = false;

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
  diasSemana = [
    'LUNES',
    'MARTES',
    'MIERCOLES',
    'JUEVES',
    'VIERNES',
    'SABADO',
    'DOMINGO',
  ];

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

        // Formateo horario
        this.instalaciones.forEach((instalacion) => {
          if (instalacion.horarioApertura && instalacion.horarioCierre) {
            instalacion.horarioApertura = this.formatTime(
              instalacion.horarioApertura
            );
            instalacion.horarioCierre = this.formatTime(
              instalacion.horarioCierre
            );
          }
          if (instalacion.diasAbierto) {
            instalacion.diasAbierto.sort((a: any, b: any) => {
              return this.diasSemana.indexOf(a) - this.diasSemana.indexOf(b);
            });
          }
        });
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

  //Que al pulsar editar la información de esa instalación se envie al modal
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
      this.isEditing = true;
    } else {
      console.error('Instalación no válida para editar.');
    }
  }

  //Apertura y cierre de modales
  openCreateInstalacionModal() {
    this.showCreateInstalacionModal = true;
  }

  openEditInstalacionModal() {
    this.showEditInstalacionModal = true;
  }

  closeModal() {
    this.showCreateInstalacionModal = false;
    this.showEditInstalacionModal = false;
  }

  onInstalacionEditada() {
    this.obtenerInstalacionesPorFincaID(this.decoded.idFinca);
  }
  onInstalacionCreada() {
    this.obtenerInstalacionesPorFincaID(this.decoded.idFinca);
  }

  //Formateo fecha
  formatTime(horario: Array<number>): string {
    const horas = horario[0].toString().padStart(2, '0');
    const minutos = horario[1].toString().padStart(2, '0');
    return horas + ':' + minutos;
  }

  //Comprobación para que si esta abierto todos los días sustituya por el texto TODOS LOS DIAS
  isTodosLosDias(diasAbierto: string[]): boolean {
    return (
      diasAbierto.length === this.diasSemana.length &&
      diasAbierto.every((dia) => this.diasSemana.includes(dia))
    );
  }
}
