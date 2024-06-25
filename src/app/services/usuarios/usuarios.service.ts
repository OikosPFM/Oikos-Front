import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8081/api/v1/usuarios';
  private http = inject(HttpClient);
  constructor() {}
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUsuariosByFinca(mytoken: any): Observable<any> {
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

    return this.http
      .get(`${this.apiUrl}/finca/${decodedToken.idFinca}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al crear instalación:', error);
          return throwError(error);
        })
      );
  }

  getUsuarioByIdauth(id: number, mytoken: any): Observable<any> {
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

    return this.http.get(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al crear instalación:', error);
        return throwError(error);
      })
    );
  }

  getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
  updateUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, usuario);
  }
  /*deleteUsuario(usuario: any): Observable<any> {
    console.log('Eliminando tarea', usuario);
    return this.http.delete(`${this.apiUrl}`, { body: usuario });
  }*/

  deleteUsuario(idUsuario: number, mytoken: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }

    // Decodifica el token para obtener el rol del usuario
    const decodedToken: any = mytoken;
    const userRole = decodedToken?.rol;

    if (userRole !== 'ADMIN') {
      console.error('Usuario no autorizado para eliminar instalaciones.');
      return throwError('Usuario no autorizado para eliminar instalaciones.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .delete<any>(`${this.apiUrl}/${idUsuario}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al eliminar instalación:', error);
          return throwError(error);
        })
      );
  }

  updateEstadoUsuario(idUsuario: any, mytoken: any): Observable<any> {
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

    return this.http
      .patch(`${this.apiUrl}/${idUsuario}`, { estado: true }, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al crear instalación:', error);
          return throwError(error);
        })
      );
  }
}
