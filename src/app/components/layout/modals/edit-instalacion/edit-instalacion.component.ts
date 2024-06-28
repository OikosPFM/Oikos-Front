import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InstalacionesService } from '../../../../services/instalaciones/instalaciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-edit-instalacion',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './edit-instalacion.component.html',
  styleUrl: './edit-instalacion.component.css',
  providers: [InstalacionesService],
})
export class EditInstalacionComponent {
  @Output() close = new EventEmitter<void>();
  @Output() instalacionEditada: EventEmitter<void> = new EventEmitter<void>();
  @Input() instalacionEditando: any;

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
          this.isEditing = false;
          this.instalacionEditada.emit();
          this.onClose();

          alert(
            `La instalación con ID: ${this.instalacion.idInstalacion} ha sido actualizada`
          );
        },
        error: (error) => {
          console.error('Error al actualizar la instalación', error);
        },
      });
  }

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

  cancelEditing(): void {
    this.instalacionEditando = null;
    this.isEditing = false;
    this.onClose();
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
      this.instalacionEditando.diasAbierto.push(checkbox.value);
    } else {
      const index = this.instalacionEditando.diasAbierto.indexOf(
        checkbox.value
      );
      if (index > -1) {
        this.instalacionEditando.diasAbierto.splice(index, 1);
      }
    }
  }
}
