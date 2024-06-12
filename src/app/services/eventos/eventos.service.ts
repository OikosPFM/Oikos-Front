import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  private apiUrl = 'http://localhost:8081/api/v1/eventos';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEventoById(idEvento: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idEvento}`);
  }
  createEventos(evento: any): Observable<any> {
    return this.http.post(this.apiUrl, evento);
  }

  updateEventos(evento: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, evento);
  }

  deleteEventos(idEvento: string): Observable<any> {
    console.log(`${this.apiUrl}/${idEvento}`);
    console.log('Eliminando evento en servicio', idEvento);
    return this.http.delete(`${this.apiUrl}/${idEvento}`);
  }
}
