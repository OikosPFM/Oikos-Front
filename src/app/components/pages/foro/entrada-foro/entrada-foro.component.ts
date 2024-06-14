import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradasService } from '../../../../services/entradas/entradas.service';
// import { FooterLayoutComponent } from '../../layout/footer/footer.component';
// import { HeaderLayoutComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-entrada-foro',
  standalone: true,
  imports: [ FormsModule, CommonModule ], // HeaderLayoutComponent, FooterLayoutComponent
  templateUrl: './entrada-foro.component.html',
  styleUrl: './entrada-foro.component.css'
})

export class EntradaForoComponent implements OnInit {

  // Crear Entrada
  entradaForo: any = { titulo: ' ', textoComentario: ' ', autor: ' ', ID_entrada: ' ', fecha: ' ', hora: ' ' };
  constructor(private entradasService: EntradasService,
              private route: ActivatedRoute,
              private router: Router) {}

  createEntradaForo(entryForm: NgForm): void {
    if (entryForm.invalid) {
      alert('Por favor, llena todos los campos');
      return
    }

    const currentDate = new Date();
    this.entradaForo.fecha = currentDate.toISOString().split('T')[0];
    this.entradaForo.hora = currentDate.toTimeString().split(' ')[0];

    this.entradasService.createEntradaForo(this.entradaForo).subscribe({
      next: (data) => {
      console.log('Entry created succesfully', data);
      alert(`La entrada con el título: ${this.entradaForo.titulo} y mensaje: ${this.entradaForo.textoComentario} ha sido creada exitosamente.`);
      entryForm.resetForm();
    },
    error: (error) => {
      console.error('Error creating entry', error);
    },
    });
  }

  // Ver Entrada
  entradasForo: any[] = [];
  sort: string | null = null;
  filter: string | null = null;
  id: string | null = null;

  ngOnInit(): void {
    const idQuery = this.route.snapshot.queryParamMap.get('idQuery');
    const sort = this.route.snapshot.queryParamMap.get('sort');
    const filter = this.route.snapshot.queryParamMap.get('filter');
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID', this.id);
    this.loadEntradas();
  }
  loadEntradas(): void {
     this.entradasService.getEntradasForo().subscribe({
       next: (data: any) => {
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

  // Actualizar y editar Entrada
  updateEntrada() {
    if (!this.entradaForo.ID_entrada) {
      alert('Por favor, selecciona un id.');
      return;
    }
    if (
      !this.entradaForo.titulo &&
      !this.entradaForo.textoComentario
    ) {
      alert('Por favor, selecciona al menos un campo para actualizar.');
      return;
    }
    const updatedEntradaForo: any = {};
    for (const key in this.entradaForo) {
      if (this.entradaForo[key]) {
        console.log('key', key);
        console.log('this.entradaForo[key]', this.entradaForo[key]);
        updatedEntradaForo[key] = this.entradaForo[key];
      } else {
        console.log('key', key);
        console.log('this.evento[key]', this.entradaForo[key]);
      }
    }
    console.log('updatedEntradaForo', updatedEntradaForo);
    this.entradasService.updateEntradaForo(updatedEntradaForo).subscribe({
      next: (data: any) => {
        console.log('Entry updated successfully', data);
        alert(
          `La Entrada con id:${this.entradaForo.ID_entrada} ha sido actualizado exitosamente.`
        );
        this.loadEntradas();
      },
      error: (error: any) => {
        console.error('Error updating entry', error);
      },
    });
  }
  //   if (!this.entradaForo.ID_entrada) {
  //     alert('Por favor, selecciona un entrada');
  //     return;
  //   }
  //   if (
  //     !this.entradaForo.nombre &&
  //     !this.entradaForo.titulo &&
  //     !this.entradaForo.texto_comentario
  //   ) {
  //     alert('Por favor, selecciona al menos un campo para editar');
  //     return;
  //   }
  //   const updatedEntradaForo: any = {...this.entradaForo };
  //   for (const key in this.entradasForo) {
  //     if (this.entradasForo[key]) {
  //       console.log('key', key);
  //       console.log('this.entradaForo[key]', this.entradasForo[key]);
  //       updatedEntradaForo[key] = this.entradasForo[key];
  //     } else {
  //       console.log('key', key);
  //       console.log('this.entradaForo[key]', this.entradasForo[key]);
  //     }
  //   }
  //   console.log('updatedEntradaForo', updatedEntradaForo);
  //   this.entradasService.updateEntradaForo(updatedEntradaForo).subscribe ({
  //     next: (data) => {
  //       console.log('Entry succesfully updated', data);
  //       alert(`La entrada con id: ${this.entradaForo.ID_entrada} ha sido actualizada.`);
  //       this.loadEntradas();
  //     },
  //     error: (error) => {
  //       console.error('Error updating entry', error);
  //     },
  //   })

    // this.router.navigate(['updateEntradaForo', entradaForo.ID_entrada]);

  }

  // Eliminar Entrada

