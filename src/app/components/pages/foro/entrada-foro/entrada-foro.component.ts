import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NgxPaginationModule } from 'ngx-pagination';
import { catchError, throwError } from 'rxjs';
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
  usuario = {}
  authService: any;
  http: any;
  mytoken: any;
  constructor(
    private entradasService: EntradasService,
    private route: ActivatedRoute,
    private router: Router,
    
  ) { const token = localStorage.getItem('token');
      if (token) {
        this.decoded = jwtDecode(token);
        this.entradaForo.finca.idFinca = this.decoded.idFinca;
        this.nombreUsuario = `${this.decoded.nombre} ${this.decoded.apellido}`;
      } else {
        console.error('Token not found in localStorage');
      }
    }
  ngOnInit(): void {
    // this.usuario = this.getCurrentUserId();
    this.obtenerEntradasForoPorFincaId(this.decoded.idFinca, this.decoded.usuarioId);
    this.getEntradasByFincaId(this.decoded.idFinca, this.decoded.usuario);
    this.getFilteredEntradas();
    this.isLoggedIn = this.authService.isLoggedIn();
    const currentUser = this.decoded;
    this.currentUserId = currentUser ? currentUser.id : null;
    this.entryCreatorId = this.entryUserId;
  }

  entradaForo = { titulo: '', textoComentario: '', fecha: '', hora: '', idEntradaForo: { idEntradaForo: ''}, finca: {idFinca: '',},
  autor: '' };
  entradasForo: any[] = [];
  public page!: number;
  decoded: any | null;
  showEditEntradaModal: boolean = false;
  isEditing: boolean = false;
  entradaEditando: any = null;
  currentUserId: number | null = null;
  isLoggedIn: boolean = false;
  procesados: any[] = [];
  entradasProcesadas: any[] = [];
  nombreUsuario: string = '';
  public entryCreatorId: number | null = null;
  public entryUserId: number | null = null;

  // Usuarios logeados (Da igual el rol)
  getCurrentUserId() {
    this.currentUserId = this.authService.getUserId();
    this.isLoggedIn = this.currentUserId !== null;
  }

  // Crear Entradas
  createEntrada(entryForm: NgForm, mytoken: any, entradaForo: any): void {
    
    console.log(this.entradaForo);
    if (entryForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    const currentDate = new Date();
    this.entradaForo.fecha = currentDate.toISOString().split('T')[0];
    this.entradaForo.hora = currentDate.toTimeString().split(' ')[0];
    this.entradaForo.autor = this.authService.getCurrentUser();

    this.entradasService.createEntradas(this.entradaForo, this.decoded).subscribe({
      next: (data: any) => {
        console.log('Entry created successfully', data);
        console.log(data);
        alert(
          `La entrada: ${this.entradaForo.titulo} y comentario ${this.entradaForo.textoComentario} han sido creadas exitosamente.`
        );
        this.entryUserId = this.decoded.usuarioId;
        this.onRefreshClick();
      },
      error: (error: any) => {
        console.error('Error al crear la entrada', error);
      },
    });

    // Decodifica el token para obtener el rol y el nombre del usuario
    const decodedToken: any = mytoken;
    const userRole = decodedToken?.rol;
    const userName = `${decodedToken?.nombre} ${decodedToken?.apellido}`;

    // Agrega el nombre del usuario a la entrada
    entradaForo.usuario = userName;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${mytoken}`,
    });

    return this.http.post(this.apiUrl, entradaForo, { headers }).pipe(
      catchError((error) => {
        console.error('Error al crear entrada:', error);
        return throwError(error);
      })
    );
  }
  apiUrl(apiUrl: any, entradaForo: any, arg2: { headers: HttpHeaders; }) {
    throw new Error('Method not implemented.');
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
  deleteEntrada(idEntrada: string): void {
      this.entradasService.deleteEntradaForo(idEntrada, this.decoded).subscribe({
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

  // Obtener Entrada dependiendo de la finca
  obtenerEntradasForoPorFincaId(fincaId: number, usuario: number): void {
    this.entradasService.getEntradasByFincaId(fincaId, usuario).subscribe(
      (data) => {
        this.entradasForo = data;
        console.log('Entradas:', this.entradasForo);
      },
      (error) => {
        console.error('Error al obtener entradas:', error);
      }
    );
  }

  getEntradasByFincaId(fincaId: number, usuario: any): void {
    this.entradasService.getEntradasByFincaId(fincaId, this.decoded.idUsuario).subscribe(
      (data: any) => {
        this.entradasForo = data;
        const entradasProcesadas = data.map((entradaForo: any) => ({
          id: this.entradaForo.idEntradaForo,
          title: this.entradaForo.titulo,
          start: `${this.entradaForo.fecha}T${this.entradaForo.hora}`,
          description: this.entradaForo.textoComentario,
          color: 'pink',
        }));
        this.procesados = entradasProcesadas;
        console.log(this.entradasForo);
        console.log(this.procesados);
      },
      (error: any) => {
        console.error('Error al obtener los entradas por ID de finca', error);
      }
    );
  }

  getFilteredEntradas(): void {
    this.entradasService.getEntradasForo().subscribe(
      (data) => {
        this.entradasForo = data;
        console.log(data);
        this.filterEntradasByFincaId();
        this.filterEntradasByUsuarioId();
        const gestionadas = this.entradasForo.map((entradaForo: any) => ({
          id: entradaForo.idEntradaForo,
          facilites: entradaForo.foro.idForo,
          title: entradaForo.title,
          description: entradaForo.textoComentario,
          user: `${entradaForo.usuarioAsignado?.nombre} ${entradaForo.usuarioAsignado?.primerApellido} ${entradaForo.usuarioAsignado?.segundoApellido}`,
          color: 'green',
        }));
        this.entradasProcesadas = gestionadas;
        console.log('tareas procesadas', this.entradasProcesadas)
        console.log();
        console.log('Filtered Tareas', this.entradasForo);
      },
      (error) => {
        console.error('Error al obtener las tareas', error);
      }
    );
  }
  filterEntradasByFincaId(): void {
    this.entradasForo = this.entradasForo.filter(
      (entradaForo) => entradaForo.finca.idFinca == this.decoded.idFinca
    );
    console.log('filtrado por finca');
  }
  filterEntradasByUsuarioId(): void {
    this.entradasForo = this.entradasForo.filter(
      (entradaForo) => entradaForo.usuarioAsignado.idUsuario == this.decoded.idUsuario
    );
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

  // Actualizar Entrada Editada
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
