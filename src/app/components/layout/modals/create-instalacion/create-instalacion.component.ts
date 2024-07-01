import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InstalacionesService } from '../../../../services/instalaciones/instalaciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-create-instalacion',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './create-instalacion.component.html',
  styleUrl: './create-instalacion.component.css',
  providers: [InstalacionesService],
})
export class CreateInstalacionComponent {
  @Output() instalacionCreada: EventEmitter<void> = new EventEmitter<void>();
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

  decoded: any | null;
  isEditing: boolean = false;
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
          this.onClose();
          this.instalacionCreada.emit(); // Emitir el evento después de que la eliminación sea exitosa
        },
        error: (error: any) => {
          console.error('Error al crear el evento', error);
        },
      });

    console.log(this.instalaciones);
  }

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.onClose();
    }
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
}
