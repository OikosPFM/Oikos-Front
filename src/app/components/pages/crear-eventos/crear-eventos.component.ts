import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventosService } from '../../../services/eventos.service';

@Component({
  selector: 'app-crear-eventos',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './crear-eventos.component.html',
  styleUrl: './crear-eventos.component.css',
})
export class CrearContactosComponent {
  evento = { titulo: '', fecha: '', hora: '', descripcion: '', categoria: '', participantes: '', aforo: '' };

  constructor(private eventosService: EventosService) { }

  createEventos(eventoForm: NgForm): void {
    if (eventoForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    this.eventosService.createEventos(this.evento).subscribe({
      next: (data: any) => {
        console.log('Evento created successfully', data);
        alert(
          `El evento es:  ${this.evento.titulo}, fecha: ${this.evento.fecha}, hora: ${this.evento.hora},
          descripcion: ${this.evento.descripcion}, categoria: ${this.evento.categoria},
          participantes: ${this.evento.participantes}, aforo: ${this.evento.aforo} ha sido creado exitosamente.`
        );
        eventoForm.resetForm();
      },
      error: (error: any) => {
        console.error('Error al crear el evento', error);
      },
    });
  }
}

