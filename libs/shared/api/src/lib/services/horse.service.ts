import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Horse } from '../models/horse.interface';
import { Character } from '../models/character.interface';
import { User } from '../models/user.interface';
import { Stable } from '../models/stable.interface';

@Injectable({
  providedIn: 'root',
})
export class HorseService {
  private baseUrl = 'https://api.example.com/horses'; // Mock or real API endpoint
  private horses: Horse[];
//   private characters: Character[];
//   private users: User[];
//   private stables: Stable[];
  private nextId: number = 1;

  constructor(private http: HttpClient) {
    // this.users = [
    //     { id: '1', name: 'John Doe', email: 'johndoe@gmail.com', role: 'Admin', password: 'password' },
    //     { id: '2', name: 'Jane Smith', email: 'janesmith@gmail.com', role: 'User', password: 'password' },
    //     { id: '3', name: 'Alice Johnson', email: 'alicejohnson@gmail.com', role: 'User', password: 'password' },
    // ];
    // this.stables = [
    //     { id: '1', name: 'Moorland Stable', location: 'Moorland' },
    //     { id: '2', name: 'Golden Hills Stable', location: 'Jaspers Farm' },
    //     { id: '3', name: 'Silverglade Stable', location: 'Silverglade' },
    // ];
    // this.characters = [
    //     { id: '1', name: 'John Doe', ridingSkill: 75, user: this.users[0], stable: this.stables[0] },
    //     { id: '2', name: 'Jane Smith', ridingSkill: 85, user: this.users[1], stable: this.stables[1] },
    // ];
    this.horses = [
      { id: '1', characterId: '1', name: 'Thunder', breed: 'Arabian', age: 5 },
      { id: '2', characterId: '1', name: 'Shadow', breed: 'Friesian', age: 7 },
      { id: '3', characterId: '1', name: 'Star', breed: 'Mustang', age: 4 },
    ];
    this.nextId = this.horses.length + 1;
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
    const newHorse = { ...horse, id: (this.nextId++).toString() };
    this.horses.push(newHorse);

    console.log(newHorse);

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
