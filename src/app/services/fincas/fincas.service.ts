import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FincasService {
  private apiUrl = 'http://localhost:8081/api/v1/fincas';

  private http = inject(HttpClient);

  getAllFincas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
