import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://api.example.com/users'; // Mock of echte API
  private users: User[];

  constructor(private http: HttpClient) {
    this.users = [
      { id: '1', name: 'John Doe', email: 'johndoe@gmail.com', role: 'Admin', password: 'password' },
      { id: '2', name: 'Jane Smith', email: 'janesmith@gmail.com', role: 'User', password: 'password' },
      { id: '3', name: 'Alice Johnson', email: 'alicejohnson@gmail.com', role: 'User', password: 'password' },
    ]
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserById(id: string): Observable<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return of(user);
  }

  createUser(user: User): Observable<void> {
    this.users.push(user);
    return of(undefined);
  }

  updateUser(id: string, user: User): Observable<void> {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = user;
    return of(undefined);
  }

  deleteUser(id: string): Observable<void> {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    return of(undefined);
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.baseUrl);
  // }

  // getUserById(id: string): Observable<User> {
  //   return this.http.get<User>(`${this.baseUrl}/${id}`);
  // }

  // createUser(user: User): Observable<User> {
  //   return this.http.post<User>(this.baseUrl, user);
  // }

  // updateUser(id: string, user: User): Observable<User> {
  //   return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  // }

  // deleteUser(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
  // }
}
