import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://localhost:4200/oikos-bbdd';

  constructor(private http: HttpClient) { }

  getEventos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createEventos(evento: any): Observable<any> {
    return this.http.post(this.apiUrl, evento);
  }

  updateEventos(evento: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, evento);
  }

  deleteEventos(evento: { deleteId: string }): Observable<any> {
    console.log('Eliminando evento en servicio', evento);
    return this.http.delete(`${this.apiUrl}`, { body: evento });
  }
}