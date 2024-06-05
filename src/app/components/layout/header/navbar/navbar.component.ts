import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    // Verifica si hay un token en el almacenamiento local
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    // Redirige al usuario a la página de inicio de sesión o a la página de inicio
    this.router.navigate(['/login']);
  }
}
