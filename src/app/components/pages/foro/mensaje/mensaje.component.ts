import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EntradasService } from '../../../../services/entradas/entradas.service';
import { MensajesService } from '../../../../services/mensajes/mensajes.service';

@Component({
  selector: 'app-mensaje',
  standalone: true, // HeaderLayoutComponent, FooterLayoutComponent
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class MensajeComponent implements OnInit {
  // entradaSeleccionada: EntradaForoComponent | undefined | any = { titulo: ' ', textoComentario: ' '};
  entradaSeleccionada: any = { titulo: '', textoComentario: '' };
  respuesta: string = '';
  mensaje: any = {
    cuerpo: ' ',
    autor: ' ',
    ID_entrada: ' ',
    ID_mensaje: ' ',
    fecha: ' ',
    hora: ' ',
  };
  mensajes: any[] = [];
  entradaForo = {
    titulo: '',
    textoComentario: '',
    fecha: '',
    hora: '',
    idEntradaForo: { idEntradaForo: '' },
  };
  entradasForo: any[] = [];
  decoded: any | null;
  currentUserId: number | null = null;
  isLoggedIn: boolean = false;
  procesados: any[] = [];
  mensajesProcesadas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private mensajesService: MensajesService,
    private entradasService: EntradasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const entradaId = +params['id'];
      this.getEntradas(entradaId);
      // this.getMensajes;
      this.getMensajesByEntradaForoId(entradaId);
      //filtrar mensajes
      // mensajeshtml
    });
  }

  // Cargar (VER) Entrada Seleccionada
  getEntradas(entradaId: number): void {
    this.entradasService.getEntradasForo().subscribe({
      next: (data: any) => {
        this.entradasForo = data.sort(
          (a: any, b: any) =>
            new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
        this.entradaSeleccionada = this.entradasForo.find(
          (entrada) => entrada.idEntrada === entradaId
        );
        // this.entradasForo = data.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        //  this.entradasForo = data;
        // this.entradaSeleccionada = this.entradasForo.find(e => e.idEntradaForo === entradaId) || { titulo: '', textoComentario: '' };
        console.log('Entradas: ', this.entradasForo);
      },
      error: (error: any) => {
        console.error('There was an error: ', error);
      },
    });
  }

  createMensaje(responseForm: NgForm): void {
    console.log(this.mensaje);
    if (responseForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    const currentDate = new Date();
    this.mensaje.fecha = currentDate.toISOString().split('T')[0];
    this.mensaje.hora = currentDate.toTimeString().split(' ')[0];

    this.mensajesService.createMensaje(this.mensaje).subscribe({
      next: (data: any) => {
        console.log('Entry created successfully', data);
        console.log(data);
        alert(
          `La entrada con el comentario ${this.mensaje.cuerpo} ha sido creadas exitosamente.`
        );
        this.onRefreshClick();
      },
      error: (error: any) => {
        console.error('Error al crear la entrada', error);
      },
    });
  }

  // Cargar (VER) Respuesta a Entrada Seleccionada (Mensaje)
  // getMensajes(entradaId: number): void {
  //   this.mensajesService.getMensajesForo(entradaId).subscribe({
  //     next: (data: any) => {
  //       this.mensaje = data;
  //       //.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  //       //  this.mensaje = data;
  //       console.log('Mensajes: ', this.mensajes);
  //       // console.log('Mensajes: ', this.mensaje);
  //     },
  //     error: (error: any) => {
  //       console.error('There was an error: ', error);
  //     },
  //   });
  // }
  getMensajes(): void {
    this.mensajesService.getMensajesForo().subscribe({
      next: (data: any) => {
        // this.mensajes = data.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.mensajes = data;
        console.log('Entradas: ', this.mensajes);
      },
      error: (error: any) => {
        console.error('There was an error: ', error);
      },
    });
  }
  onRefreshClick(): void {
    this.getMensajes();
  }

  // Obtener Entrada dependiendo de la finca
  obtenerMensajesPorEntradaForoId(
    entradaForoId: number,
    usuario: number
  ): void {
    this.mensajesService
      .getMensajesByEntradaForoId(entradaForoId, usuario)
      .subscribe(
        (data) => {
          this.mensajes = data;
          console.log('Instalaciones:', this.mensajes);
        },
        (error) => {
          console.error('Error al obtener instalaciones:', error);
        }
      );
  }

  getMensajesByEntradaForoId(entradaForoId: number): void {
    this.mensajesService
      .getMensajesByEntradaForoId(entradaForoId, this.decoded.idUsuario)
      .subscribe(
        (data: any) => {
          this.mensajes = data;
          const mensajesProcesadas = data.map((mensaje: any) => ({
            id: this.mensaje.idMensaje,
            texto: this.mensaje.cuerpo,
            start: `${this.mensaje.fecha}T${this.mensaje.hora}`,
            color: 'pink',
          }));
          this.procesados = mensajesProcesadas;
          console.log(this.mensajes);
          console.log(this.procesados);
        },
        (error: any) => {
          console.error('Error al obtener los eventos por ID de finca', error);
        }
      );
  }

  getFilteredMensajes(): void {
    this.mensajesService.getMensajes(this.entradaSeleccionada).subscribe(
      (data) => {
        this.mensajes = data;
        console.log(data);
        this.filterMensajesByEntradaForoId();
        this.filterMensajesByUsuarioId();
        const gestionadas = this.mensajes.map((mensaje: any) => ({
          id: mensaje.idMensaje,
          facilites: mensaje.entradaForo.idEntrada,
          title: mensaje.cuerpo,
          user: `${mensaje.usuarioAsignado?.nombre} ${mensaje.usuarioAsignado?.primerApellido} ${mensaje.usuarioAsignado?.segundoApellido}`,
          color: 'green',
        }));
        this.mensajesProcesadas = gestionadas;
        console.log('tareas procesadas', this.mensajesProcesadas);
        console.log();
        console.log('Filtered Tareas', this.mensajes);
      },
      (error) => {
        console.error('Error al obtener las tareas', error);
      }
    );
  }
  filterMensajesByEntradaForoId(): void {
    this.mensajes = this.mensajes.filter(
      (mensaje) => mensaje.entradaForo.idEntrada == this.decoded.idEntrada
    );
    console.log('filtrado por finca');
  }
  filterMensajesByUsuarioId(): void {
    this.mensajes = this.mensajes.filter(
      (mensaje) => mensaje.usuarioAsignado.idUsuario == this.decoded.idUsuario
    );
  }

  // }

  // Obtener solo los mensajes de esa entradaa

  // Responder a la Entrada
  responderEntrada(respuestaForm: NgForm): void {
    if (respuestaForm.invalid) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    const respuestaData = {
      // entradaId: this.entradaSeleccionada?.entradaForo.idEntrada,
      entradaId: this.entradaSeleccionada?.idEntradaForo,
      textoRespuesta: this.respuesta,
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toTimeString().split(' ')[0],
    };

    this.entradasService.responderEntrada(respuestaData).subscribe({
      next: (data: any) => {
        console.log('Respuesta enviada con éxito', data);
        alert('Respuesta enviada con éxito');
        respuestaForm.resetForm();
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Error al enviar la respuesta', error);
      },
    });
  }

  // Eliminar Mensaje
  deleteMensaje(id: number): void {
    this.mensajesService.deleteMensaje(id).subscribe({
      next: (data: any) => {
        console.log('Mensaje eliminado con éxito', data);
        this.getMensajes();
      },
      error: (error: any) => {
        console.error('Error al eliminar el mensaje', error);
      },
    });

    console.log(this.mensaje);
  }
}
// [
//   nombre: "Mi entrada"
//   idEntrada: 5
//   mensajes:[
//     {mensaje:" Hola soy jp",
//      idEntrada: 5
//     },
//     {mensaje: "Hola soy Andrea"}

//   ]
// ]

// [mensajemalo,mensajemalo,mensajebueno,mensajemalo,mensajebueno]
// arrayMensaje.filter((mensaje)=>mensaje.Identrada===id)
// [mensaje,mensaje,mensaje]
