import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstalacionesService {
  private apiUrl = 'http://localhost:8081/api/v1/instalaciones';

  private http = inject(HttpClient);

  getAllInstalaciones(): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        // Puedes agregar otros headers según sea necesario
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

  getInstalacionesByFincaID(fincaID: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const url = `${this.apiUrl}/finca/${fincaID}`;
      return this.http.get<any[]>(url, { headers }).pipe(
        catchError((error) => {
          console.error('Error al obtener instalaciones por finca ID:', error);
          return throwError(error);
        })
      );
    } else {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }
  }

  /*createInstalaciones(instalacion: any): Observable<any> {
    return this.http.post(this.apiUrl, instalacion);
  }*/

  createInstalaciones(instalacion: any, mytoken: any): Observable<any> {
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

    return this.http.post(this.apiUrl, instalacion, { headers }).pipe(
      catchError((error) => {
        console.error('Error al crear instalación:', error);
        return throwError(error);
      })
    );
  }

  deleteInstalacion(idInstalacion: string, mytoken: any): Observable<any> {
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

    const url = `${this.apiUrl}/${idInstalacion}`;
    return this.http.delete<any>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error al eliminar instalación:', error);
        return throwError(error);
      })
    );
  }

  /*updateInstalacion(instalacion: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${instalacion.idInstalacion}`,
      instalacion
    );
  }*/

  updateInstalacion(instalacion: any, mytoken: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }

    // Decodifica el token para obtener el rol del usuario
    const decodedToken: any = mytoken;
    const userRole = decodedToken?.rol;

    if (userRole !== 'ADMIN') {
      console.error('Usuario no autorizado para actualizar instalaciones.');
      return throwError('Usuario no autorizado para actualizar instalaciones.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .patch<any>(`${this.apiUrl}/${instalacion.idInstalacion}`, instalacion, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar instalación:', error);
          return throwError(error);
        })
      );
  }
}
