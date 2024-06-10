import { Component } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [],
  templateUrl: './crear-tarea.component.html',
  styleUrl: './crear-tarea.component.css',
})
export class CrearTareaComponent {
  tareas: any = [];
  constructor(private tareasService: ApiService) {}
}
