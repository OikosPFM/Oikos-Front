import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from '../../../../services/auth/auth.service';
import { EntradasService } from '../../../../services/entradas/entradas.service';
import { EditEntradaModalComponent } from '../../../layout/edit-entrada-modal/edit-entrada-modal.component';

@Component({
  selector: 'app-entrada-foro',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule, NgxPaginationModule, EditEntradaModalComponent],
  templateUrl: './entrada-foro.component.html',
  styleUrl: './entrada-foro.component.css',
  providers: [EntradasService]
})
export class EntradaForoComponent {

  constructor(
    private entradasService: EntradasService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { const token = localStorage.getItem('token');
      if (token) {
        this.decoded = jwtDecode(token);
        this.entradaForo.finca.idFinca = this.decoded.idFinca;
      } else {
        console.error('Token not found in localStorage');
      }
    }
  ngOnInit(): void {
    this.getCurrentUserId();
  }

  entradaForo = { titulo: '', textoComentario: '', fecha: '', hora: '', idEntradaForo: { idEntradaForo: ''}, finca: {idFinca: '',},};
  entradasForo: any[] = [];
  public page!: number;
  decoded: any | null;
  showEditEntradaModal: boolean = false;
  isEditing: boolean = false;
  entradaEditando: any = null;
  currentUserId: number | null = null;
  isLoggedIn: boolean = false;

  // Usuarios
  getCurrentUserId() {
    this.currentUserId = this.authService.getUserId();
    this.isLoggedIn = this.currentUserId !== null;
  }

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

    this.entradasService.createEntradas(this.entradaForo, this.decoded).subscribe({
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

  // Eliminar Entradas
  deleteEntrada(id: number): void {
      this.entradasService.deleteEntradaForo(id).subscribe({
        next: (data: any) => {
          console.log('Entrada eliminada con éxito', data);
          this.getEntradas();
        },
        error: (error: any) => {
          console.error('Error al eliminar la entrada', error);
        },
      });
  
      console.log(this.entradaForo);
  }

  // Redirigir a Mensaje con la entrada seleccionada
  goToMensaje(id: number) {
    this.router.navigate(['/mensaje', id]);
  }

  // Empezar a Editar
  startEditing(entradaForo: any): void {
    if (entradaForo) {
      // Copiar cada campo uno por uno según sea necesario
      this.entradaEditando = {
        titulo: entradaForo.titulo,
        textoComentario: entradaForo.textoComentario
      };

      console.log(this.entradaEditando);
      this.isEditing = true;
    } else {
      console.error('Instalación no válida para editar.');
    }
  }

  // Actualizar Entrada
  updateEntradaForo(entryForm: NgForm): void {
  if (entryForm.invalid) {
    alert('Por favor, rellena todos los campos.');
    return;
  }
  
  this.entradasService
      .updateEntradaForo(this.entradaEditando, this.decoded)
      .subscribe({
        next: (data) => {
          console.log('Instalación actualizada con éxito', data);
          this.getEntradas();
          this.isEditing = false;

          alert(
            `La instalación con ID: ${this.entradaForo.idEntradaForo} ha sido actualizada`
          );
        },
        error: (error) => {
          console.error('Error al actualizar la instalación', error);
        },
      });
  }

  cancelEditing(): void {
    this.entradaEditando = null;
    this.isEditing = false;
  }

  // Modales
  closeModal() {
    this.showEditEntradaModal = false;
  }

  openEditEntradaModal() {
    this.showEditEntradaModal = true;
  }

}
