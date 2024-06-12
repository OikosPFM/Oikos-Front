import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InstalacionesService } from '../../../services/instalaciones/instalaciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-instalaciones',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './manage-instalaciones-modal.component.html',
  styleUrl: './manage-instalaciones-modal.component.css',
  providers: [InstalacionesService],
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

  constructor(private instalacionesService: InstalacionesService) {}

  instalaciones: any[] = [];
  instalacion = {
    //Más adelante habrá que conectar con la finca que se este gestionando
    finca: {
      idFinca: 1,
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
    this.getInstalaciones();
  }
  getInstalaciones(): void {
    this.instalacionesService.getAllInstalaciones().subscribe((data) => {
      this.instalaciones = data;
      console.log(this.instalaciones);
    });
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

    this.instalacionesService.createInstalaciones(this.instalacion).subscribe({
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

  deleteInstalacion(id: string): void {
    this.instalacionesService.deleteEventos(id).subscribe({
      next: (data: any) => {
        console.log('Evento eliminado con éxito', data);
        this.getInstalaciones();
      },
      error: (error: any) => {
        console.error('Error al eliminar el evento', error);
      },
    });

    console.log(this.instalaciones);
  }

  instalacionEditando: any = null;

  startEditing(instalacion: any): void {
    this.instalacionEditando = { ...instalacion };
    console.log(this.instalacionEditando);
    this.isEditing = true;
  }

  updateInstalacion(instalacionForm: NgForm): void {
    if (instalacionForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    // Lógica para actualizar la instalación...
    this.instalacionesService
      .updateInstalacion(this.instalacionEditando)
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
}
