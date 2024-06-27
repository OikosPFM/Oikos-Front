import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-registros',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './manage-registros.component.html',
  styleUrl: './manage-registros.component.css',
  providers: [UsuariosService],
})
export class ManageRegistrosComponent implements OnInit {
  usuarios: any[] = [];
  usuariosActivos: any[] = [];
  usuariosInactivos: any[] = [];
  decoded: any | null;

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
    this.getUsuariosByFinca();
  }

  getUsuariosByFinca(): void {
    this.usuariosService.getUsuariosByFinca(this.decoded).subscribe((data) => {
      this.usuarios = data;
      this.usuariosActivos = this.usuarios.filter(
        (usuario) => usuario.estado === true && usuario.rol !== 'ADMIN'
      );
      this.usuariosInactivos = this.usuarios.filter(
        (usuario) => usuario.estado === false
      );
      console.log(this.usuariosActivos);
      console.log(this.usuariosInactivos);
    });
  }

  cambiarEstadoUsuario(idUsuario: number) {
    this.usuariosService.updateEstadoUsuario(idUsuario, this.decoded).subscribe(
      (response) => {
        console.log('Usuario actualizado:', response);
        // Actualiza la lista de usuarios si es necesario
        this.getUsuariosByFinca();
      },
      (error) => {
        console.error('Error actualizando el usuario:', error);
        // Manejar el error
      }
    );
  }
  eliminarUsuario(idUsuario: number) {
    this.usuariosService.deleteUsuario(idUsuario, this.decoded).subscribe(
      (response) => {
        console.log('Usuario actualizado:', response);
        // Actualiza la lista de usuarios si es necesario
        this.getUsuariosByFinca();
      },
      (error) => {
        console.error('Error actualizando el usuario:', error);
        // Manejar el error
      }
    );
  }
}
