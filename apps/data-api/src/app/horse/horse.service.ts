import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Horse, HorseDocument } from './schemas/horse.schema';
import { Model } from 'mongoose';
import { Neo4jService } from '../neo4j/neo4j.service';
import { horseCypher } from './neo4j/horse.cypher';
import { CreateHorseDto } from './schemas/horse.dto';
import { Character, CharacterDocument } from '../character/schemas/character.schema';

@Injectable()
export class HorseService {
  constructor(
    @InjectModel(Horse.name) private horseModel: Model<HorseDocument>,
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async getAll(): Promise<Horse[]> {
    const horses = await this.horseModel.find().populate('characterId').exec();
    return horses;
  }

  async getById(id: string): Promise<Horse> {
    const horse = await this.horseModel.findById(id).populate('characterId').exec();
    return horse;
  }

  async create(horse: CreateHorseDto, userId: string): Promise<Horse> {
    const character = await this.characterModel.findOne({ userId });
  
    if (!character) {
      throw new BadRequestException('You must create a character first!');
    }
  
    const createdHorse = await (await new this.horseModel({
      ...horse,
      characterId: character._id,
    })).save();
  
    await this.neo4jService.write(horseCypher.addHorse, {
      id: createdHorse._id.toString(),
      name: createdHorse.name,
      breed: createdHorse.breed,
      age: createdHorse.age,
      characterId: character._id.toString(),
    });
  
    return createdHorse;
  }
  
  async update(id: string, horse: CreateHorseDto, userId: string): Promise<Horse> {
    const character = await this.characterModel.findOne({ userId });
  
    if (!character) {
      throw new BadRequestException('Character not found');
    }
  
    const updatedHorse = await this.horseModel.findByIdAndUpdate(
      id,
      {
        ...horse,
        characterId: character._id,
      },
      { new: true }
    ).exec();
  
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