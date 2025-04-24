import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Horse } from '../models/horse.interface';
import { CreateHorseDto } from '../models/create-horse.dto';

@Injectable({
  providedIn: 'root',
})
export class HorseService {
  private baseUrl = 'https://starstable-api2.azurewebsites.net/api/horse';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getHorses(): Observable<Horse[]> {
    return this.http.get<{ results: Horse[] }>(`${this.baseUrl}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  getHorsesByCharacterId(characterId: string): Observable<Horse[]> {
    return this.http
      .get<{ results: Horse[] }>(`${this.baseUrl}/character/${characterId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(map(response => response.results));
  }  

  getHorseById(id: string): Observable<Horse> {
    return this.http.get<{ results: Horse }>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  createHorse(horse: CreateHorseDto): Observable<Horse> {
    return this.http.post<Horse>(`${this.baseUrl}`, horse, { headers: this.getAuthHeaders() });
  }

  updateHorse(id: string, horse: CreateHorseDto): Observable<Horse> {
    return this.http.put<Horse>(`${this.baseUrl}/${id}`, horse, { headers: this.getAuthHeaders() });
  }

  deleteHorse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}