import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8081/api/v1/usuarios';
  private http = inject(HttpClient);
  constructor() {}
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
  updateUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, usuario);
  }
  deleteUsuario(usuario: any): Observable<any> {
    console.log('Eliminando tarea', usuario);
    return this.http.delete(`${this.apiUrl}`, { body: usuario });
  }
}
