import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { EventosService } from '../../../services/eventos.service';

@Component({
  selector: 'app-editar-eventos',
  standalone: true,
  imports: [ HeaderComponent,
    FooterComponent,
    FormsModule,
    CommonModule,],
  templateUrl: './editar-eventos.component.html',
  styleUrl: './editar-eventos.component.css'
})
export class EditarEventosComponent {
  eventos: any[] = [];
  evento: any = { id_evento:'',titulo: '', fecha: '', hora: '', descripcion: '', categoria:'',participantes:'', aforo:''};;
  constructor(private eventosService: EventosService) {}
  ngOnInit(): void {
    this.evento();
  }
  loadEventos(): void {
    this.eventosService.getEventos().subscribe({
      next: (data: any) => {
        this.loadEventos = data.data;
        console.log('Eventos: ', this.eventos);
      },
      error: (error: any) => {
        console.error('Hubo un error al editar el evento: ', error);
      },
    });
  }
  updateEventos(): void {
    if (!this.evento.id_evento) {
      alert('Por favor, selecciona un id.');
      return;
    }
    if (
      !this.evento.titulo &&
      !this.evento.fecha &&
      !this.evento.hora &&
      !this.evento.descripcion &&
      !this.evento.categoria &&
      !this.evento.participantes &&
      !this.evento.aforo
    ) {
      alert('Por favor, selecciona al menos un campo para actualizar.');
      return;
    }
    const updatedEvento: any = {};
    for (const key in this.evento) {
      if (this.evento[key]) {
        console.log('key', key);
        console.log('this.evento[key]', this.evento[key]);
        updatedEvento[key] = this.evento[key];
      } else {
        console.log('key', key);
        console.log('this.evento[key]', this.evento[key]);
      }
    }
    console.log('updatedEvento', updatedEvento);
    this.eventosService.updateEventos(updatedEvento).subscribe({
      next: (data: any) => {
        console.log('Event updated successfully', data);
        alert(
          `El Evento con id:${this.evento.id} ha sido actualizado exitosamente.`
        );
        this.loadEventos();
      },
      error: (error: any) => {
        console.error('Error updating event', error);
      },
    });
  }
}

