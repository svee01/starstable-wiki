import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { stableCypher } from './neo4j/stable.cypher';
import { Stable } from './schemas/stable.schema';

@Injectable()
export class StableService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getAll() {
    const result = await this.neo4jService.read(stableCypher.getAllStables, {});
    const stables = result.records.map((record) => record.get('stable').properties);
    return { results: stables };
  }

  async getById(id: string) {
    const result = await this.neo4jService.read(stableCypher.getStableById, { id });
    return { results: result.records[0].get('stable').properties };
  }

  async addStable(stable: Stable) {
    await this.neo4jService.write(stableCypher.addStable, stable);
    return stable;
  }

  async updateStable(stable: Stable, userId: string) {
    await this.neo4jService.write(stableCypher.updateStable, stable);
    return stable;
  }

  async deleteStable(stableId: string, userId: string) {
    await this.neo4jService.write(stableCypher.removeStable, { id: stableId });
    return { message: 'Stable deleted' };
  }
}
