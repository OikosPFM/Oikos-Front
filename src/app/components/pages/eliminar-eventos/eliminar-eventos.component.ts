import { Component } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';

@Component({
  selector: 'app-eliminar-eventos',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-eventos.component.html',
  styleUrl: './eliminar-eventos.component.css'
})
export class EliminarEventosComponent {
  eventos: any[] = [];
  evento: any = { deleteId_evento: '' };

  constructor(private eventosService: EventosService) {}
  ngOnInit(): void {
    this.loadEventos();
  }
  loadEventos(): void {
    this.eventosService.getEventos().subscribe({
      next: (data: any) => {
        this.eventos = data.data;
        console.log('Eventos: ', this.eventos);
      },
      error: (error: any) => {
        console.error('Hubo un error al eliminar el evento: ', error);
      },
    });
  }
  deleteEventosClick(id: string): void {
    this.evento.deleteId = id;
    console.log('Eliminando evento', this.evento);
    this.eventosService.deleteEventos(this.evento).subscribe({
      next: (data: any) => {
        console.log('Evento eliminado con éxito', data);
        this.eventos = this.eventos.filter((evento) => evento.id_evento !== id);
      },
      error: (error: any) => {
        console.error('Error al eliminar el evento', error);
      },
    });
  }
}

