import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstalacionesService {
  private apiUrl = 'http://localhost:8081/api/v1/instalaciones';

  private http = inject(HttpClient);

  getAllInstalaciones(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
