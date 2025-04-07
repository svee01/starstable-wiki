import { Injectable } from '@nestjs/common';
import { Horse } from './schemas/horse.schema';
import { Neo4jService } from '../neo4j/neo4j.service';
import { horseCypher } from './neo4j/horse.cypher';

@Injectable()
export class HorseService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getAll() {
    const result = await this.neo4jService.read(horseCypher.getAllHorses, {});
    const horses = result.records.map((record) => ({
      ...record.get('horse').properties,
      character: record.get('character')?.properties ?? null,
    }));
    return { results: horses };
  }

  async getById(id: string) {
    const result = await this.neo4jService.read(horseCypher.getHorseById, { id });
    const record = result.records[0];
    return {
      results: {
        ...record.get('horse').properties,
        character: record.get('character')?.properties ?? null,
      },
    };
  }

  async addHorse(horse: Horse) {
    await this.neo4jService.write(horseCypher.addHorse, horse);
    return horse;
  }

  async updateHorse(horse: Horse, userId: string) {
    // Add ownership check if needed
    await this.neo4jService.write(horseCypher.updateHorse, horse);
    return horse;
  }

  async deleteHorse(horseId: string, userId: string) {
    // Add ownership check if needed
    await this.neo4jService.write(horseCypher.removeHorse, { id: horseId });
    return { message: 'Horse deleted' };
  }
}
