import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Character } from '../models/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private baseUrl = 'https://api.example.com/characters'; // Mock or real API endpoint
  private characters: Character[];

  constructor(private http: HttpClient) {
    this.characters = [
      { id: '1', name: 'John Doe', ridingSkill: 75, userId: 'user1', stableId: 'stable1' },
      { id: '2', name: 'Jane Smith', ridingSkill: 85, userId: 'user2', stableId: 'stable2' },
    ];
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
    this.characters.push(character);
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
