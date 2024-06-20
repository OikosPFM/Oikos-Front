import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  private apiUrl = 'http://localhost:8081/api/v1/entradasForo';

  constructor(private http: HttpClient) {}

  createEntradas(evento: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, evento, { headers });
  }
}