import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Character } from '../models/character.interface';
import { CreateCharacterDto } from '../models/create-character.dto';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private baseUrl = 'starstable-api2.azurewebsites.net/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    return this.http.get<Character[]>(`${this.baseUrl}`, { headers });
  }

  getCharacterByUserId(userId: string): Observable<Character> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    // HOW TO FIX RESULTS WRAP:
    return this.http.get<{ results: Character }>(`${this.baseUrl}/user/${userId}`, { headers }).pipe(
      map(response => response.results)
    );
  }

  getCharacterById(id: string): Observable<Character> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.get<{ results: Character }>(`${this.baseUrl}/${id}`, { headers }).pipe(
      map(response => response.results)
    );    
  }

  createCharacter(character: CreateCharacterDto): Observable<Character> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    return this.http.post<Character>(`${this.baseUrl}`, character, { headers });
  }

  updateCharacter(id: string, character: CreateCharacterDto): Observable<Character> {
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