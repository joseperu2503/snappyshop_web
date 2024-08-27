import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

export const JW_TOKEN = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.baseUrl}`;

  get<T>(query: string, params?: HttpParams) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.get<T>(url, {
      params,
      context: new HttpContext().set(JW_TOKEN, true),
    });
  }

  post<T>(query: string, body: object) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.post<T>(url, body, {
      context: new HttpContext().set(JW_TOKEN, true),
    });
  }

  put<T>(query: string, body: object) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.put<T>(url, body, {
      context: new HttpContext().set(JW_TOKEN, true),
    });
  }

  delete<T>(query: string) {
    const url = `${this.apiUrl}/${query}`;
    return this.http.delete<T>(url, {
      context: new HttpContext().set(JW_TOKEN, true),
    });
  }
}
