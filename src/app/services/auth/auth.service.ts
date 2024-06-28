import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  constructor() {}
  private isAuthenticated: boolean = false;

  registerUsuario(usuarioData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8081/register', usuarioData);
  }

  loginUsuario(usuarioData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8081/login', usuarioData);
    this.isAuthenticated = true;
  }

  isLoggedIn(): boolean {
    // Verifica si el token está presente en localStorage
    return localStorage.getItem('token') !== null;
  }

  logout(): void {
    // Remueve el token del localStorage
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }
}