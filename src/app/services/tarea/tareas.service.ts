import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private apiUrl = 'http://localhost:8081/api/v1/tareas';
  private http = inject(HttpClient);

  getTareas(): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.get<any[]>(this.apiUrl, { headers });
    } else {
      console.error('No se encontró token en localStorage.');
      // Maneja este caso de error según tus requerimientos
      return new Observable<any[]>((observer) => {
        observer.error('No se encontró token en localStorage.');
        observer.complete();
      });
    }
  }
  createTarea(tarea: any, mytoken: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }

    // Decodifica el token para obtener el rol del usuario
    const decodedToken: any = mytoken;
    const userRole = decodedToken?.rol;

    if (userRole !== 'ADMIN') {
      console.error('Usuario no autorizado para crear tareas.');
      return throwError('Usuario no autorizado para crear tareas.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, tarea, { headers }).pipe(
      catchError((error) => {
        console.error('Error al crear tarea:', error);
        return throwError(error);
      })
    );
  }
  deleteTarea(idTarea: string, mytoken: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }

    // Decodifica el token para obtener el rol del usuario
    const decodedToken: any = mytoken;
    const userRole = decodedToken?.rol;

    if (userRole !== 'ADMIN') {
      console.error('Usuario no autorizado para eliminar tareas.');
      return throwError('Usuario no autorizado para eliminar tareas.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<any>(`${this.apiUrl}/${idTarea}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al eliminar tarea:', error);
        return throwError(error);
      })
    );
  }

  updateTarea(tarea: any, mytoken: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }

    // Decodifica el token para obtener el rol del usuario
    const decodedToken: any = mytoken;
    const userRole = decodedToken?.rol;

    if (userRole !== 'ADMIN') {
      console.error('Usuario no autorizado para actualizar tareas.');
      return throwError('Usuario no autorizado para actualizar tareas.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .patch<any>(`${this.apiUrl}/${tarea.idTarea}`, tarea, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar instalación:', error);
          return throwError(error);
        })
      );
  }
  getTareasByFincaIdAndUsuarioId(
    fincaId: number,
    usuarioId: number
  ): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const url = `${this.apiUrl}/finca/${fincaId}/usuario/${usuarioId}`; // Endpoint para obtener tareas por finca ID y usuario ID
      return this.http.get<any[]>(url, { headers }).pipe(
        catchError((error) => {
          console.error(
            'Error al obtener tareas por finca ID y usuario ID:',
            error
          );
          return throwError(error);
        })
      );
    } else {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }
  }
}
