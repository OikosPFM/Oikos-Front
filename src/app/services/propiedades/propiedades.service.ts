import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropiedadesService {
  private apiUrl = 'http://localhost:8081/api/v1/propiedades';
  private http = inject(HttpClient);
  constructor() {}
  getPropiedades(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createPropiedad(propiedad: any): Observable<any> {
    return this.http.post(this.apiUrl, propiedad);
  }
  updatePropiedad(propiedad: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, propiedad);
  }
  deletePropiedad(propiedad: any): Observable<any> {
    console.log('Eliminando tarea', propiedad);
    return this.http.delete(`${this.apiUrl}`, { body: propiedad });
  }

  buscarOCrearPropiedad(propiedadData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, propiedadData);
  }
}
