import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
  decoded: any | null;

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      this.decoded = jwtDecode(token);
      const userRole = this.decoded.rol;
      if (userRole === 'ADMIN') {
        // Usuario con rol de administrador puede acceder
        return true;
      } else {
        // Otros roles (o falta de rol específico) redirigen a la página principal
        this.router.navigate(['/']);
        return false;
      }
    } else {
      // No hay token, redirige a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
