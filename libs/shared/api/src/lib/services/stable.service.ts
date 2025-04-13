import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Stable } from '../models/stable.interface';

@Injectable({
  providedIn: 'root',
})
export class StableService {
  private baseUrl = 'http://localhost:3000/api/stable';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getStables(): Observable<Stable[]> {
    return this.http.get<{ results: Stable[] }>(`${this.baseUrl}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  getStableById(id: string): Observable<Stable> {
    return this.http.get<{ results: Stable }>(`${this.baseUrl}/id/${id}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  createStable(stable: Stable): Observable<Stable> {
    return this.http.post<Stable>(`${this.baseUrl}`, stable, { headers: this.getAuthHeaders() });
  }

  updateStable(stable: Stable): Observable<Stable> {
    return this.http.put<Stable>(`${this.baseUrl}/${stable._id}`, stable, { headers: this.getAuthHeaders() });
  }

  deleteStable(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
