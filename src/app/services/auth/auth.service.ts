import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  constructor(private router: Router) {}
  private isAuthenticated: boolean = false;
  private currentUser: any = null;

  private apiUrl = 'http://localhost:8081/api/auth';

  registerUsuario(usuarioData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8081/register', usuarioData);
  }

  loginUsuario(usuarioData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8081/login', usuarioData);
    this.isAuthenticated = true;
  }

  // Método para loguear un usuario
  login(user: any) {
    this.currentUser = user;
  }

  // Método para obtener el usuario autenticado
  getCurrentUser() {
    return this.currentUser;
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
    return this.currentUser !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
    this.currentUser = null;
  }

  verifyToken(token: string) {
    return this.http.post(`${this.apiUrl}/verifyToken`, { token });
  }

}