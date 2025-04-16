import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CreateStableDto } from '../models/create-stable.dto';
import { Stable } from '../models/stable.interface';

@Injectable({
  providedIn: 'root',
})
export class StableService {
  private baseUrl = 'https://starstable-api-cbg0c6cmhvghgpdv.westeurope-01.azurewebsites.net/api/stable';

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
    return this.http.get<{ results: Stable }>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  createStable(stable: CreateStableDto): Observable<Stable> {
    return this.http.post<Stable>(`${this.baseUrl}`, stable, { headers: this.getAuthHeaders() });
  }

  updateStable(id: string, stable: CreateStableDto): Observable<Stable> {
    return this.http.put<Stable>(`${this.baseUrl}/${id}`, stable, { headers: this.getAuthHeaders() });
  }

  deleteStable(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}