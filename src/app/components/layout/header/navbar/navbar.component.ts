import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavigationOption {
  link: string;
  title: string;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  options: NavigationOption[] = [
    { link: '/contacta', title: 'Contáctanos' },
    { link: '/about', title: 'Acerca de nosotros' },
  ];
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
