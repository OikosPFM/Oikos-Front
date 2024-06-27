import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private apiUrl = 'http://localhost:8081/api/v1/mensajes';
  private http = inject(HttpClient);

  constructor() {}
  // constructor(private http: HttpClient) { }

  // getMensajes(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}`);
  // }

  getMensaje(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener mensajes de una entrada específica
  // getMensajesForo(idEntrada: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/mensajes/${idEntrada}`);
  // }
  getMensajesForo(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Crear un nuevo mensaje
  createMensaje(mensaje: any): Observable<any> {
    return this.http.post(this.apiUrl, mensaje);  }

  // createMensaje(mensaje: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/create`, mensaje);
  // }

  updateMensaje(id: number, mensaje: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, mensaje);
  }

  deleteMensaje(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
