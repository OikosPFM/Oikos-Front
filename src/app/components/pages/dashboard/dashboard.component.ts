import { Component, OnInit, OnDestroy } from '@angular/core';
import { FullcalendarComponent } from '../../layout/main/fullcalendar/fullcalendar.component';
import { CreateEventModalComponent } from '../../layout/create-event-modal/create-event-modal.component';
import { CommonModule } from '@angular/common';
import { TareaModalComponent } from '../../layout/tareas/tarea-modal/tarea-modal.component';
import { ManageInstalacionesComponent } from '../../layout/manage-instalaciones/manage-instalaciones.component';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FullcalendarComponent,
    CreateEventModalComponent,
    CommonModule,
    RouterModule,
    TareaModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private usuariosService: UsuariosService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.decoded = jwtDecode(token);
      // Ahora puedes usar this.decoded de manera segura
    } else {
      console.error('Token not found in localStorage');
    }
  }

  ngOnInit(): void {
    this.getUsuarioInfo();
    this.seleccionarTextoAleatorio();
    this.getUsuariosByFinca();
  }

  decoded: any | null;
  showCreateEventModal: boolean = false;
  showManageInstalacionesModal: boolean = false;
  infoUsuario: any;
  usuariosInactivos: any[] = [];
  textos: string[] = [
    'Más vale el vecino cercano, que el pariente lejano.',
    'Puerta abierta, vecino que entra.',
    'Razona con tu vecino y lo harás tu amigo.',
    'El que buen vecino tiene, buen amigo gana.',
  ];

  textoSeleccionado: string = '';

  getUsuarioInfo(): void {
    this.usuariosService
      .getUsuarioByIdauth(this.decoded.idUsuario, this.decoded)
      .subscribe((data) => {
        this.infoUsuario = data;
        console.log(this.infoUsuario);
      });
  }

  seleccionarTextoAleatorio(): void {
    const indiceAleatorio = Math.floor(Math.random() * this.textos.length);
    this.textoSeleccionado = this.textos[indiceAleatorio];
  }

  openCreateEventModal() {
    this.showCreateEventModal = true;
  }

  openManageInstalacionesModal() {
    this.showManageInstalacionesModal = true;
  }

  closeModal() {
    this.showCreateEventModal = false;
    this.showManageInstalacionesModal = false;
  }

  getUsuariosByFinca(): void {
    this.usuariosService.getUsuariosByFinca(this.decoded).subscribe((data) => {
      this.usuariosInactivos = data.filter(
        (usuario: any) => usuario.estado === false
      );
      console.log(this.usuariosInactivos);
    });
  }
}
