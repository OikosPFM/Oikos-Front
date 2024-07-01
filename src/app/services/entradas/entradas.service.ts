import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { EditEntradaModalComponent } from '../../components/layout/edit-entrada-modal/edit-entrada-modal.component';

@Injectable({
  providedIn: 'root'
})
export class EntradasService {
  show(EditEntradaModalComponent: EditEntradaModalComponent, arg1: { title: string; data: any; }) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:8081/api/v1/entradasForo';
  // private http = inject(HttpClient);

  constructor(private http: HttpClient) {}

  // createEntradas(evento: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post(this.apiUrl, evento, { headers  });
  // }
  createEntradas(entradaForo: any, mytoken: any): Observable<any> {
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

    return this.http.post(this.apiUrl, entradaForo, { headers }).pipe(
      catchError((error) => {
        console.error('Error al crear entrada:', error);
        return throwError(error);
      })
    );
  }

  getEntradasForo(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(`${this.apiUrl}`, { headers: headers });
  }

  getAllEntradas(): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.get<any[]>(this.apiUrl, { headers });
    } else {
      console.error('No se encontró token en localStorage.');
      return new Observable<any[]>((observer) => {
        observer.error('No se encontró token en localStorage.');
        observer.complete();
      });
    }
  }

  getEntradasByFincaId(fincaId: number, usuarioId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const url = `${this.apiUrl}/finca/${fincaId}/usuario/${usuarioId}`;
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

  responderEntrada(respuesta: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/respuestas`, respuesta);
  }

  updateEntradaForo(entradaForo: any, mytoken: any): Observable<any> {
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
      .patch<any>(`${this.apiUrl}/${entradaForo.idEntradaForo}`, entradaForo, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar instalación:', error);
          return throwError(error);
        })
      );
  }

  patchEntradaForo(id: string, updates: Partial<any>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, updates);
  }

  deleteEntradaForo(idEntrada: string, mytoken: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró token en localStorage.');
      return throwError('No se encontró token en localStorage.');
    }

    // Decodifica el token para obtener el rol del usuario
    const decodedToken: any = mytoken;
    const userRole = decodedToken?.rol;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<any>(`${this.apiUrl}/${idEntrada}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al eliminar tarea:', error);
        return throwError(error);
      })
    );
  }

}