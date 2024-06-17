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

  createInstalaciones(instalacion: any): Observable<any> {
    return this.http.post(this.apiUrl, instalacion);
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

  updateInstalacion(instalacion: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${instalacion.idInstalacion}`,
      instalacion
    );
  }
}
