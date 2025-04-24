import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.interface';
import { Character } from '../models/character.interface';
import { CreateUserDto } from '../models/create-user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://starstable-api2.azurewebsites.net/api/user';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    return this.http.get<{ results: User[] }>(`${this.baseUrl}`, { headers }).pipe(
      map(response => response.results)
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<{ results: User }>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(map(response => response.results));
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<{ results: User }>(`${this.baseUrl}/${email}`, { headers: this.getAuthHeaders() })
      .pipe(map(response => response.results));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user, { headers: this.getAuthHeaders() });
  }

  updateUser(userDto: CreateUserDto): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}`, userDto, {
      headers: this.getAuthHeaders(),
    });
  }  

  deleteUser(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }  

  getCharacterByUserId(): Observable<Character> {
    return this.http.get<{ results: Character }>(`${this.baseUrl}/character`, { headers: this.getAuthHeaders() })
      .pipe(map(response => response.results));
  }
}
