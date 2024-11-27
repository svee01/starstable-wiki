import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Stable } from '../models/stable.interface';

@Injectable({
  providedIn: 'root',
})
export class StableService {
  private baseUrl = 'https://api.example.com/stables'; // Mock or real API endpoint
  private stables: Stable[];
  private nextId: number = 1;

  constructor(private http: HttpClient) {
    this.stables = [
      { id: '1', name: 'Moorland Stable', location: 'Moorland' },
      { id: '2', name: 'Golden Hills Stable', location: 'Jaspers Farm' },
      { id: '3', name: 'Silverglade Stable', location: 'Silverglade' },
    ];
    this.nextId = this.stables.length + 1;
  }

  getStables(): Observable<Stable[]> {
    return of(this.stables);
  }

  getStableById(id: string): Observable<Stable> {
    const stable = this.stables.find((stable) => stable.id === id);
    if (!stable) {
      throw new Error(`Stable with id ${id} not found`);
    }
    return of(stable);
  }

  createStable(stable: Stable): Observable<void> {
    const newStable = { ...stable, id: (this.nextId++).toString() };
    this.stables.push(newStable);

    console.log(newStable);

    return of(undefined);
  }

  updateStable(id: string, stable: Stable): Observable<void> {
    const index = this.stables.findIndex((stable) => stable.id === id);
    if (index === -1) {
      throw new Error(`Stable with id ${id} not found`);
    }
    this.stables[index] = stable;
    return of(undefined);
  }

  deleteStable(id: string): Observable<void> {
    const index = this.stables.findIndex((stable) => stable.id === id);
    if (index === -1) {
      throw new Error(`Stable with id ${id} not found`);
    }
    this.stables.splice(index, 1);
    return of(undefined);
  }
}
