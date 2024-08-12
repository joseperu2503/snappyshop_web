import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.baseUrl}`;

  get<T>(query: string, params?: HttpParams) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.get<T>(url, { params });
  }

  post<T>(query: string, body: any) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.post<T>(url, body);
  }

  put<T>(query: string, body: any) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.put<T>(url, body);
  }

  delete<T>(query: string) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.delete<T>(url);
  }
}
