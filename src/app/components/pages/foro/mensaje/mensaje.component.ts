import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradasService } from '../../../../services/entradas/entradas.service';
import { MensajesService } from '../../../../services/mensajes/mensajes.service';

@Component({
  selector: 'app-mensaje',
  standalone: true, // HeaderLayoutComponent, FooterLayoutComponent
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css'],
  imports: [ FormsModule, CommonModule ]
})
export class MensajeComponent implements OnInit {
  // entradaSeleccionada: EntradaForoComponent | undefined | any = { titulo: ' ', textoComentario: ' '};
  entradaSeleccionada: any = { titulo: '', textoComentario: '' };
  respuesta: string = '';
  mensaje: any = { cuerpo: ' ', autor: ' ', ID_entrada: ' ', ID_mensaje: ' ', fecha: ' ', hora: ' ' };
  mensajes: any[] = [];
  entradaForo = { titulo: '', textoComentario: '', fecha: '', hora: '', idEntradaForo: { idEntradaForo: ''}};
  entradasForo: any[] = [];

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
      this.getMensajes();
    });
  }

  // Cargar (VER) Entrada Seleccionada
  getEntradas(entradaId: number): void {
    this.entradasService.getEntradasForo().subscribe({
      next: (data: any) => {
        this.entradasForo = data.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.entradaSeleccionada = this.entradasForo.find(entrada => entrada.idEntrada === entradaId);        
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

  // Crear Mensaje (RESPUESTA)
  // createMensaje(entryForm: NgForm): void {
  //   const nuevoMensaje = {
  //     cuerpo: this.respuesta,
  //     // IdEntrada: this.entradaSeleccionada?.entradaForo.idEntrada,
  //     IdEntrada: this.entradaSeleccionada.idEntradaForo,
  //     tiempo: new Date().toISOString().slice(0, 19).replace('T', ' '),
  //   };
    
  //   console.log(this.mensaje);
  //   if (entryForm.invalid) {
  //     alert('Por favor, rellena todos los campos.');
  //     return;
  //   }

  //   const currentDate = new Date();
  //   this.mensaje.fecha = currentDate.toISOString().split('T')[0];
  //   this.mensaje.hora = currentDate.toTimeString().split(' ')[0];
  //   this.mensaje.ID_entrada = this.entradaSeleccionada.idEntrada;

  //   this.mensajesService.createMensaje(this.mensaje).subscribe({
  //     next: (data: any) => {
  //       console.log('Message created successfully', data);
  //       console.log(data);
  //       alert(
  //         `El mensaje: ${this.mensaje.titulo} y comentario ${this.mensaje.textoComentario} ha sido creado exitosamente.`
  //       );
  //       // this.router.navigate(['/entrada-foro', this.entradaSeleccionada.idEntradaForo]);
  //       // this.router.navigate(['/entrada-foro', this.entradaSeleccionada?.entradaForo.idEntrada]);
  //       this.getMensajes(this.entradaSeleccionada.idEntrada);
  //       // mensajeForm.resetForm();
  //       // this.onRefreshClick();
  //     },
  //     error: (error: any) => {
  //       console.error('Error al crear el mensaje', error);
  //     },
  //   });
  // }

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
  // }

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
  // deleteMensaje(id: number): void {
  //   this.mensajesService.deleteMensaje(id).subscribe({
  //     next: (data: any) => {
  //       console.log('Mensaje eliminado con éxito', data);
  //       this.getMensajesForo();
  //     },
  //     error: (error: any) => {
  //       console.error('Error al eliminar el mensaje', error);
  //     },
  //   });

  //   console.log(this.mensaje);
  // }
}
