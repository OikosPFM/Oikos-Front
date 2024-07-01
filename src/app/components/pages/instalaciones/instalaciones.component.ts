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
  selector: 'app-instalaciones',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    CreateInstalacionComponent,
    EditInstalacionComponent,
  ],
  templateUrl: './instalaciones.component.html',
  styleUrl: './instalaciones.component.css',
  providers: [InstalacionesService],
})
export class InstalacionesComponent {
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

  obtenerInstalacionesPorFincaID(fincaID: number): void {
    this.instalacionesService.getInstalacionesByFincaID(fincaID).subscribe(
      (data) => {
        this.instalaciones = data;
        // Formaeo de la hora
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

  formatTime(horario: Array<number>): string {
    const horas = horario[0].toString().padStart(2, '0');
    const minutos = horario[1].toString().padStart(2, '0');
    return horas + ':' + minutos;
  }

  isTodosLosDias(diasAbierto: string[]): boolean {
    return (
      diasAbierto.length === this.diasSemana.length &&
      diasAbierto.every((dia) => this.diasSemana.includes(dia))
    );
  }
}
