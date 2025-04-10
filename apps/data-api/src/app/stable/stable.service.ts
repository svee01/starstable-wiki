import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stable, StableDocument } from './schemas/stable.schema';
import { Model } from 'mongoose';
import { Neo4jService } from '../neo4j/neo4j.service';
import { stableCypher } from './neo4j/stable.cypher';
import { CreateStableDto } from './schemas/stable.dto';

@Injectable()
export class StableService {
  constructor(
    @InjectModel(Stable.name) private stableModel: Model<StableDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async getAll() {
    const stables = await this.stableModel.find().exec();
    return { results: stables };
  }

  async getById(id: string) {
    const stable = await this.stableModel.findById(id).exec();
    return { results: stable };
  }

  async create(stable: CreateStableDto) {
    const createdStable = await (await new this.stableModel(stable)).save();
    await this.neo4jService.write(stableCypher.addStable, {
      id: createdStable._id.toString(),
      name: createdStable.name,
      location: createdStable.location,
    });
    return createdStable;
  }  

  async update(id: string, stable: Stable) {
    const updatedStable = await this.stableModel.findByIdAndUpdate(id, stable, { new: true }).exec();
    await this.neo4jService.write(stableCypher.updateStable, {
      id: updatedStable._id.toString(),
      name: updatedStable.name,
      location: updatedStable.location,
    });
    return updatedStable;
  }

  async delete(id: string) {
    const deletedStable = await this.stableModel.findByIdAndDelete(id).exec();
    await this.neo4jService.write(stableCypher.removeStable, { id });
    return deletedStable;
  }
}
