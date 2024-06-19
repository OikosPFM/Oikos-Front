import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private apiUrl = 'http://localhost:8081/api/v1/tareas';
  private http = inject(HttpClient);
  constructor() {}
  getTareas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createTarea(tarea: any): Observable<any> {
    return this.http.post(this.apiUrl, tarea);
  }
  updateTarea(tarea: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, tarea);
  }
  patchTarea(id: string, updates: Partial<any>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, updates);
  }
  deleteTarea(id: string): Observable<any> {
    console.log('Eliminando tarea con', id);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
