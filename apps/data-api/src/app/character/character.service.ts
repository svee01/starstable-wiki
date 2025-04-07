import { Injectable } from '@nestjs/common';
import { Character } from './schemas/character.schema';
import { Neo4jService } from '../neo4j/neo4j.service';
import { characterCypher } from './neo4j/character.cypher';

@Injectable()
export class CharacterService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getAll() {
    const result = await this.neo4jService.read(characterCypher.getAllCharacters, {});
    const characters = result.records.map((record) => ({
      ...record.get('character').properties,
      user: record.get('user')?.properties ?? null,
      stable: record.get('stable')?.properties ?? null,
    }));
    return { results: characters };
  }

  async getById(id: string) {
    const result = await this.neo4jService.read(characterCypher.getCharacterById, { id });
    const record = result.records[0];
    return {
      results: {
        ...record.get('character').properties,
        user: record.get('user')?.properties ?? null,
        stable: record.get('stable')?.properties ?? null,
      },
    };
  }

  async addCharacter(character: Character) {
    await this.neo4jService.write(characterCypher.addCharacter, character);
    return character;
  }

  async updateCharacter(character: Character, userId: string) {
    await this.neo4jService.write(characterCypher.updateCharacter, character);
    return character;
  }

  async deleteCharacter(characterId: string, userId: string) {
    await this.neo4jService.write(characterCypher.removeCharacter, { id: characterId });
    return { message: 'Character deleted' };
  }
}
