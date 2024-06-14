import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradasService } from '../../../../services/entradas/entradas.service';

@Component({
  selector: 'app-entrada-foro',
  standalone: true,
  imports: [FormsModule, CommonModule], // HeaderLayoutComponent, FooterLayoutComponent
  templateUrl: './entrada-foro.component.html',
  styleUrls: ['./entrada-foro.component.css']
})
export class EntradaForoComponent implements OnInit {

  entradaForo: any = { titulo: '', textoComentario: '', autor: '', ID_entrada: '', fecha: '', hora: '' };
  // currentUserId: number;

  constructor(private entradasService: EntradasService, 
              private route: ActivatedRoute, 
              private router: Router) {}

  createEntradaForo(entryForm: NgForm): void {
    if (entryForm.invalid) {
      alert('Por favor, llena todos los campos');
      return;
    }

    const currentDate = new Date();
    this.entradaForo.fecha = currentDate.toISOString().split('T')[0];
    this.entradaForo.hora = currentDate.toTimeString().split(' ')[0];

    this.entradasService.createEntradaForo(this.entradaForo).subscribe({
      next: (data) => {
        console.log('Entry created successfully', data);
        alert(`La entrada con el título: ${this.entradaForo.titulo} y mensaje: ${this.entradaForo.textoComentario} ha sido creada exitosamente.`);
        entryForm.resetForm();
        this.loadEntradas();
      },
      error: (error) => {
        console.error('Error creating entry', error);
      },
    });
  }

  entradasForo: any[] = [];
  id: string | null = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID', this.id);
    this.loadEntradas();
    // this.currentUserId = this.entradasService.getCurrentUserId();
  }

  loadEntradas(): void {
    this.entradasService.getEntradasForo().subscribe({
      next: (data: any) => {
        console.log('Data received from backend:', data);
        this.entradasForo = data;
        console.log('Entradas: ', this.entradasForo);
      },
      error: (error: any) => {
        console.error('There was an error: ', error);
      },
    });
  }

  onRefreshClick(): void {
    this.loadEntradas();
  }

  updateEntrada() {
    if (!this.entradaForo.ID_entrada) {
      alert('Por favor, selecciona un id.');
      return;
    }
    if (!this.entradaForo.titulo && !this.entradaForo.textoComentario) {
      alert('Por favor, selecciona al menos un campo para actualizar.');
      return;
    }
    const updatedEntradaForo: any = {};
    for (const key in this.entradaForo) {
      if (this.entradaForo[key]) {
        updatedEntradaForo[key] = this.entradaForo[key];
      }
    }
    this.entradasService.updateEntradaForo(updatedEntradaForo).subscribe({
      next: (data: any) => {
        console.log('Entry updated successfully', data);
        alert(`La Entrada con id:${this.entradaForo.ID_entrada} ha sido actualizado exitosamente.`);
        this.loadEntradas();
      },
      error: (error: any) => {
        console.error('Error updating entry', error);
      },
    });
  }

  deleteEntrada(id: number): void {
    // console.log('Deleting entry with id:', id); // Debugging line
    // this.entradasService.deleteEntradaForo(id).subscribe({
    //   next: (data: any) => {
    //     console.log('Evento eliminado con éxito', data);
    //     this.loadEntradas();
    //   },
    //   error: (error: any) => {
    //     console.error('Error al eliminar el evento', error);
    //   },
    // });
    this.entradasService.deleteEntradaForo(id).subscribe(() => {
      this.entradaForo = this.entradaForo.filter(this.entradaForo , this.entradaForo.id !== id);
  });
  }
}
