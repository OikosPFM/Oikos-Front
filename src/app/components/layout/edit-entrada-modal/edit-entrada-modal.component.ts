import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradasService } from '../../../services/entradas/entradas.service';

@Component({
  selector: 'app-edit-entrada-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-entrada-modal.component.html',
  styleUrl: './edit-entrada-modal.component.css'
})
export class EditEntradaModalComponent {

  constructor(
    private entradasService: EntradasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  entradaForo = { titulo: '', textoComentario: '', fecha: '', hora: '', idEntradaForo: { idEntradaForo: ''}};
  entradasForo: any[] = [];
  editando: boolean = false;
  isEditing: boolean = false;
  decoded: any | null;
  entradaEditando: any = null;

  startEditing(entradaForo: any): void {
    this.entradaEditando = { ...entradaForo };
    console.log(this.entradaEditando);
    this.isEditing = true;
  }
  cancelEditing(): void {
    this.entradaEditando = null;
    this.isEditing = false;
  }

  updateEntrada(entryForm: NgForm): void {
    if (entryForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    const currentDate = new Date();
    this.entradaForo.fecha = currentDate.toISOString().split('T')[0];
    this.entradaForo.hora = currentDate.toTimeString().split(' ')[0];

    this.entradasService.updateEntradaForo(this.entradaEditando, this.decoded).subscribe({
      next: (data) => {
        console.log('Tarea actualizada con éxito', data);
        this.getEntradas();
        this.isEditing = false;

        alert(
          `La instalación con ID: ${this.entradaEditando.idEntrada} ha sido actualizada`
        );
      },
      error: (error) => {
        console.error(
          `Error al actualizar la tarea ${JSON.stringify(this.entradaEditando)}`,
          error
        );
      },
    });
  }

  // Cargar (VER) Entradas
  getEntradas(): void {
    this.entradasService.getEntradasForo().subscribe({
      next: (data: any) => {
        this.entradasForo = data.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        //  this.entradasForo = data;
        console.log('Entradas: ', this.entradasForo);
      },
      error: (error: any) => {
        console.error('There was an error: ', error);
      },
    });
  }
}
