import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RespuestasService {
  private apiUrl = 'http://localhost:8081/api/v1/respuestasForo';

  private http = inject(HttpClient);
  constructor() {}

  getRespuestasForo(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createRespuestaForo(respuesta: any): Observable<any> {
    return this.http.post(this.apiUrl, respuesta);
  }
  updateRespuestaForo(respuesta: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, respuesta);
  }
  deleteRespuestaForo(respuesta: any): Observable<any> {
    console.log('Eliminando respuesta', respuesta);
    return this.http.delete(`${this.apiUrl}`, { body: respuesta });
  }
}
