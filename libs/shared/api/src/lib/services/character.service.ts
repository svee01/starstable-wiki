import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Character } from '../models/character.interface';
import { User } from '../models/user.interface';
import { Stable } from '../models/stable.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private baseUrl = 'https://api.example.com/characters'; // Mock or real API endpoint
  private characters: Character[];
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
    this.characters = [
      { id: '1', name: 'John Doe', ridingSkill: 75, userId: '1', stableId: '1' },
      { id: '2', name: 'Jane Smith', ridingSkill: 85, userId: '1', stableId: '1' },
    ];
    this.nextId = this.characters.length + 1;
  }

  getCharacters(): Observable<Character[]> {
    return of(this.characters);
  }

  getCharacterById(id: string): Observable<Character> {
    const character = this.characters.find((char) => char.id === id);
    if (!character) {
      throw new Error(`Character with id ${id} not found`);
    }
    return of(character);
  }

  createCharacter(character: Character): Observable<void> {
    const newCharacter = { ...character, id: (this.nextId++).toString() };
    this.characters.push(newCharacter);

    console.log(newCharacter);

    return of(undefined);
  }

  updateCharacter(id: string, character: Character): Observable<void> {
    const index = this.characters.findIndex((char) => char.id === id);
    if (index === -1) {
      throw new Error(`Character with id ${id} not found`);
    }
    this.characters[index] = character;
    return of(undefined);
  }

  deleteCharacter(id: string): Observable<void> {
    const index = this.characters.findIndex((char) => char.id === id);
    if (index === -1) {
      throw new Error(`Character with id ${id} not found`);
    }
    this.characters.splice(index, 1);
    return of(undefined);
  }
}
