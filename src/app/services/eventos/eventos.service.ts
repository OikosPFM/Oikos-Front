import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

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
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http
        .get<any[]>(`${this.apiUrl}/${idEvento}`, { headers })
        .pipe(
          catchError((error) => {
            console.error('Error al obtener eventos por finca ID:', error);
            return throwError(error);
          })
        );
    } else {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }
  }

  getEventosByFincaId(fincaId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const url = `${this.apiUrl}/finca/${fincaId}`; // Endpoint para obtener eventos por finca ID
      return this.http.get<any[]>(url, { headers }).pipe(
        catchError((error) => {
          console.error('Error al obtener eventos por finca ID:', error);
          return throwError(error);
        })
      );
    } else {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }
  }
  createEventos(evento: any, mytoken: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }

    // Decodifica el token para obtener el rol del usuario
    const decodedToken: any = mytoken;
    const userRole = decodedToken?.rol;

    if (userRole !== 'ADMIN') {
      console.error('Usuario no autorizado para crear instalaciones.');
      return throwError('Usuario no autorizado para crear instalaciones.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, evento, { headers }).pipe(
      catchError((error) => {
        console.error('Error al crear instalación:', error);
        return throwError(error);
      })
    );
  }

  updateEventos(evento: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, evento);
  }

  deleteEventos(idEvento: string, mytoken: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }

    // Decodifica el token para obtener el rol del usuario
    const decodedToken: any = mytoken;
    const userRole = decodedToken?.rol;
    console.log(userRole);

    if (userRole !== 'ADMIN') {
      console.error('Usuario no autorizado para eliminar eventos.');
      return throwError('Usuario no autorizado para eliminar eventos.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    console.log(`Eliminando evento en servicio: ${this.apiUrl}/${idEvento}`);
    return this.http
      .delete<any>(`${this.apiUrl}/${idEvento}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al eliminar instalación:', error);
          return throwError(error);
        })
      );
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

  updateEvento(evento: any, mytoken: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }

    // Decodifica el token para obtener el rol del usuario
    const decodedToken: any = mytoken;
    const userRole = decodedToken?.rol;

    if (userRole !== 'ADMIN') {
      console.error('Usuario no autorizado para actualizar eventos.');
      return throwError('Usuario no autorizado para actualizar eventos.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .patch<any>(`${this.apiUrl}/${evento.idEvento}`, evento, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar evento:', error);
          return throwError(error);
        })
      );
  }
}
