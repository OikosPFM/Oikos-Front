import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/register';
  private http = inject(HttpClient);
  constructor() {}

  registerUsuario(usuarioData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, usuarioData);
  }
}
