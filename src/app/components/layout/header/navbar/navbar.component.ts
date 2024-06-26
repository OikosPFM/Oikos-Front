import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

interface NavigationOption {
  link: string;
  title: string;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService],
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  options: NavigationOption[] = [
    { link: '/contacta', title: 'Contáctanos' },
    { link: '/about', title: 'Acerca de nosotros' },
  ];

  isLoggedIn(): boolean {
    // Verifica si hay un token en el almacenamiento local
    return !!localStorage.getItem('token');
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '/#register-form';
  }

  isDashboardPage() {
    return this.router.url === '/dashboard';
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    // Redirige al usuario a la página de inicio de sesión o a la página de inicio
    this.router.navigate(['/']);
  }
}
