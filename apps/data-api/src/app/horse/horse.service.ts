import { Injectable, ForbiddenException } from '@nestjs/common';
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

  async getAll(): Promise<{ results: Horse[] }> {
    const horses = await this.horseModel.find().populate('characterId').exec();
    return { results: horses };
  }

  async getById(id: string): Promise<{ results: Horse }> {
    const horse = await this.horseModel.findById(id).populate('characterId').exec();
    return { results: horse };
  }

  async create(horse: Horse): Promise<Horse> {
    const createdHorse = await (await new this.horseModel(horse)).save();
    await this.neo4jService.write(horseCypher.addHorse, {
      id: createdHorse._id.toString(),
      name: createdHorse.name,
      breed: createdHorse.breed,
      age: createdHorse.age,
      characterId: createdHorse.characterId.toString(),
    });
    return createdHorse;
  }

  async update(id: string, horse: Horse, characterId: string): Promise<Horse> {
    const existingHorse = await this.horseModel.findById(id).exec();

    if (!existingHorse || existingHorse.characterId.toString() !== characterId) {
      throw new ForbiddenException('You are not allowed to update this horse');
    }

    const updatedHorse = await this.horseModel.findByIdAndUpdate(id, horse, { new: true }).exec();
    await this.neo4jService.write(horseCypher.updateHorse, {
      id: updatedHorse._id.toString(),
      name: updatedHorse.name,
      breed: updatedHorse.breed,
      age: updatedHorse.age,
    });
    return updatedHorse;
  }

  async delete(id: string, characterId: string): Promise<Horse> {
    const existingHorse = await this.horseModel.findById(id).exec();

    if (!existingHorse || existingHorse.characterId.toString() !== characterId) {
      throw new ForbiddenException('You are not allowed to delete this horse');
    }

    const deletedHorse = await this.horseModel.findByIdAndDelete(id).exec();
    await this.neo4jService.write(horseCypher.deleteHorse, { id });
    return deletedHorse;
  }
}
