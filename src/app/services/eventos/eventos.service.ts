import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  private apiUrl = 'http://localhost:8081/api/v1/eventos';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(`${this.apiUrl}`, { headers: headers });
  }

  getEventoById(idEvento: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idEvento}`);
  }

  createEventos(evento: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, evento, { headers });
  }

  updateEventos(evento: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, evento);
  }

  deleteEventos(idEvento: string): Observable<any> {
    console.log(`${this.apiUrl}/${idEvento}`);
    console.log('Eliminando evento en servicio', idEvento);
    return this.http.delete(`${this.apiUrl}/${idEvento}`);
  }

  obtenerIdInstalacionPorIdEvento(
    instalaciones: any[],
    idEventoBuscado: number
  ): number | null {
    for (const instalacion of instalaciones) {
      for (const evento of instalacion.eventos) {
        if (evento.idEvento === idEventoBuscado) {
          return instalacion.idInstalacion;
        }
      }
    }
    // Si el evento no se encuentra en ninguna instalación
    return null;
  }
}
