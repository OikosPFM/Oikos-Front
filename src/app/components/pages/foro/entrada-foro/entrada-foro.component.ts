import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EntradasService } from '../../../../services/entradas/entradas.service';

@Component({
  selector: 'app-entrada-foro',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './entrada-foro.component.html',
  styleUrl: './entrada-foro.component.css',
  providers: [EntradasService]
})
export class EntradaForoComponent {

  constructor(
    private entradasService: EntradasService,
    private route: ActivatedRoute,
  ) {}

  entradaForo = { titulo: '', textoComentario: '', fecha: '', hora: '', idEntradaForo: { idEntradaForo: ''}};
  entradasForo: any[] = [];
  
  // Crear Entradas
  createEntrada(entryForm: NgForm): void {
    console.log(this.entradaForo);
    if (entryForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    const currentDate = new Date();
    this.entradaForo.fecha = currentDate.toISOString().split('T')[0];
    this.entradaForo.hora = currentDate.toTimeString().split(' ')[0];

    this.entradasService.createEntradas(this.entradaForo).subscribe({
      next: (data: any) => {
        console.log('Entry created successfully', data);
        console.log(data);
        alert(
          `La entrada: ${this.entradaForo.titulo} y comentario ${this.entradaForo.textoComentario} han sido creadas exitosamente.`
        );
        this.onRefreshClick();
      },
      error: (error: any) => {
        console.error('Error al crear la entrada', error);
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
  onRefreshClick(): void {
    this.getEntradas();
  }
}