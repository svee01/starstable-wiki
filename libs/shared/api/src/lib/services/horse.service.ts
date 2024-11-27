import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Horse } from '../models/horse.interface';

@Injectable({
  providedIn: 'root',
})
export class HorseService {
  private baseUrl = 'https://api.example.com/horses'; // Mock or real API endpoint
  private horses: Horse[];

  constructor(private http: HttpClient) {
    this.horses = [
      { id: '1', characterId: '1', name: 'Thunder', breed: 'Arabian', age: 5 },
      { id: '2', characterId: '2', name: 'Shadow', breed: 'Friesian', age: 7 },
      { id: '3', characterId: '3', name: 'Star', breed: 'Mustang', age: 4 },
    ];
  }

  getHorses(): Observable<Horse[]> {
    return of(this.horses);
  }

  getHorseById(id: string): Observable<Horse> {
    const horse = this.horses.find((horse) => horse.id === id);
    if (!horse) {
      throw new Error(`Horse with id ${id} not found`);
    }
    return of(horse);
  }

  createHorse(horse: Horse): Observable<void> {
    this.horses.push(horse);
    return of(undefined);
  }

  updateHorse(id: string, horse: Horse): Observable<void> {
    const index = this.horses.findIndex((horse) => horse.id === id);
    if (index === -1) {
      throw new Error(`Horse with id ${id} not found`);
    }
    this.horses[index] = horse;
    return of(undefined);
  }

  deleteHorse(id: string): Observable<void> {
    const index = this.horses.findIndex((horse) => horse.id === id);
    if (index === -1) {
      throw new Error(`Horse with id ${id} not found`);
    }
    this.horses.splice(index, 1);
    return of(undefined);
  }
}
