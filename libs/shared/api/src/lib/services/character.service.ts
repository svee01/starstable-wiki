import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Character } from '../models/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private baseUrl = 'http://localhost:3000/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    return this.http.get<{ results: Character[] }>(`${this.baseUrl}`, { headers }).pipe(
      map(response => response.results)
    );
  }

  getCharacterById(id: string): Observable<Character> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.get<{ results: Character }>(`${this.baseUrl}/id/${id}`, { headers }).pipe(
      map(response => response.results)
    );
  }

  createCharacter(character: Character): Observable<Character> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.post<Character>(`${this.baseUrl}`, character, { headers });
  }

  updateCharacter(id: string, character: Character): Observable<Character> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.put<Character>(`${this.baseUrl}/${id}`, character, { headers });
  }

  deleteCharacter(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}