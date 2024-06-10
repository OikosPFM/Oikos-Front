import { Component } from '@angular/core';
import { TareasService } from '../../../../services/tarea/tareas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-tareas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-tareas.component.html',
  styleUrl: './ver-tareas.component.css',
  providers: [TareasService],
})
export class VerTareasComponent {
  tareas: any = [];
  constructor(private tareasService: TareasService) {}
  loadTareas(): void {
    this.tareasService.getTareas().subscribe((data) => {
      this.tareas = data;
      console.log('Tareas: ' + JSON.stringify(this.tareas, null, 2));
    });
  }
  ngOnInit(): void {
    this.loadTareas();
  }
  onRefreshClick(): void {
    this.loadTareas();
  }
}
