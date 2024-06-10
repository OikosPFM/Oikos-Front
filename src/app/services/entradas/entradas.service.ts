import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class EntradasService {
  private apiUrl = 'http://localhost:8080/api/v1/entradasForo';

  private http = inject(HttpClient);
  constructor() {}

  getEntradasForo(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createEntradaForo(entradaForo: any): Observable<any> {
    return this.http.post(this.apiUrl, entradaForo);
  }
  updateEntradaForo(entradaForo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, entradaForo);
  }
  deleteEntradaForo(entradaForo: any): Observable<any> {
    console.log('Eliminando entrada', entradaForo);
    return this.http.delete(`${this.apiUrl}`, { body: entradaForo });
  }
}
