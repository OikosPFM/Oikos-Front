import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RespuestasService } from '../../../../services/respuestas/respuestas.service';

@Component({
  selector: 'app-respuesta-foro',
  standalone: true,
  imports: [],
  templateUrl: './respuesta-foro.component.html',
  styleUrl: './respuesta-foro.component.css'
})
export class RespuestaForoComponent {
  // Crear Respuesta
  respuestaForo = { nombre: ' ', titulo: ' ', texto_comentario: ' ', ID_autor: null, ID_respuesta: null };
  constructor(private respuestasService: RespuestasService,
              private route: ActivatedRoute) {}

  createRespuestaForo(responseForm: NgForm): void {
    if (responseForm.invalid) {
      alert('Por favor, llena todos los campos');
      return
    }
    this.respuestasService.createRespuestaForo(this.respuestaForo).subscribe({
      next: (data) => {
      console.log('Response created succesfully', data);
      alert(`La respuesta con el autor: ${this.respuestaForo.nombre}, título: ${this.respuestaForo.titulo} y mensaje: ${this.respuestaForo.texto_comentario} se ha añadido exitosamente.`);
      responseForm.resetForm();
    },
    error: (error) => {
      console.error('Error creating response', error);
    },
    });
  }

  // Ver Respuesta
  respuestasForo: any[] = [];
  sort: string | null = null;
  filter: string | null = null;
  id: string | null = null;

  ngOnInit(): void {
    const idQuery = this.route.snapshot.queryParamMap.get('idQuery');
    const sort = this.route.snapshot.queryParamMap.get('sort');
    const filter = this.route.snapshot.queryParamMap.get('filter');
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID', this.id);
    this.loadRespuestas();
  }
  loadRespuestas(): void {
    this.respuestasService.getRespuestasForo().subscribe({
      next: (data) => {
        this.respuestaForo = data.data;
        console.log('Respuestas: ', this.respuestaForo);
      },
      error: (error) => {
        console.error('There was an error: ', error);
      },
    });
  }
  onRefreshClick(): void {
    this.loadRespuestas();
  }

  // Actualizar y editar Respuesta
  updateRespuesta() {
    if (!this.respuestaForo.ID_respuesta) {
      alert('Por favor, selecciona una respuesta');
      return;
    }
    if (
      !this.respuestaForo.nombre &&
      !this.respuestaForo.titulo &&
      !this.respuestaForo.texto_comentario
    ) {
      alert('Por favor, selecciona al menos un campo para editar');
      return;
    }
    const updatedRespuestaForo: any = {};
    for (const key in this.respuestasForo) {
      if (this.respuestasForo[key]) {
        console.log('key', key);
        console.log('this.respuestaForo[key]', this.respuestasForo[key]);
        updatedRespuestaForo[key] = this.respuestasForo[key];
      } else {
        console.log('key', key);
        console.log('this.respuestaForo[key]', this.respuestasForo[key]);
      }
    }
    console.log('updatedRespuestaForo', updatedRespuestaForo);
    this.respuestasService.updateRespuestaForo(updatedRespuestaForo).subscribe ({
      next: (data) => {
        console.log('Response succesfully updated', data);
        alert(`La respuesta con id: ${this.respuestaForo.ID_respuesta} ha sido actualizada.`);
        this.loadRespuestas();
      },
      error: (error) => {
        console.error('Error updating response', error);
      },
    })
  }

  // Eliminar Respuesta
}
