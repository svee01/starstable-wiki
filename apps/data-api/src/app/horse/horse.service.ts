import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Horse, HorseDocument } from './schemas/horse.schema';
import { Model } from 'mongoose';
import { Neo4jService } from '../neo4j/neo4j.service';
import { horseCypher } from './neo4j/horse.cypher';

@Injectable()
export class HorseService {
  constructor(
    @InjectModel(Horse.name) private horseModel: Model<HorseDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async getAll() {
    const horses = await this.horseModel.find().populate('characterId').exec();
    return { results: horses };
  }

  async getById(id: string) {
    const horse = await this.horseModel.findById(id).populate('characterId').exec();
    return { results: horse };
  }

  async create(horse: Horse) {
    const createdHorse = await (await new this.horseModel(horse)).save();
    await this.neo4jService.write(horseCypher.addHorse, {
      id: createdHorse._id.toString(),
      name: createdHorse.name,
      breed: createdHorse.breed,
      age: createdHorse.age,
      characterId: createdHorse.characterId,
    });
    return createdHorse;
  }

  async update(id: string, horse: Horse) {
    const updatedHorse = await this.horseModel.findByIdAndUpdate(id, horse, { new: true }).exec();
    await this.neo4jService.write(horseCypher.updateHorse, {
      id: updatedHorse._id.toString(),
      name: updatedHorse.name,
      breed: updatedHorse.breed,
      age: updatedHorse.age,
    });
    return updatedHorse;
  }

  async delete(id: string) {
    const deletedHorse = await this.horseModel.findByIdAndDelete(id).exec();
    await this.neo4jService.write(horseCypher.deleteHorse, {
      id: id,
    });
    return deletedHorse;
  }
}
