import { BadRequestException, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stable, StableDocument } from './schemas/stable.schema';
import { Character, CharacterDocument } from '../character/schemas/character.schema';
import { Model } from 'mongoose';
import { Neo4jService } from '../neo4j/neo4j.service';
import { stableCypher } from './neo4j/stable.cypher';
import { CreateStableDto } from './schemas/stable.dto';

@Injectable()
export class StableService {
  constructor(
    @InjectModel(Stable.name) private stableModel: Model<StableDocument>,
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async getAll(): Promise<Stable[]> {
    const stables = await this.stableModel.find().exec();
    return stables;
  }

  async getById(id: string): Promise<Stable> {
    const stable = await this.stableModel.findById(id).exec();
    return stable;
  }

  async getStablesByCharacterId(characterId: string, userId: string): Promise<Stable[]> {
    const character = await this.characterModel.findById(characterId).exec();
  
    if (!character) {
      throw new NotFoundException('Character not found');
    }
  
    if (character.userId.toString() !== userId) {
      throw new ForbiddenException('You are not authorized to access this character’s stables');
    }
  
    const stables = await this.stableModel.find({ characterId }).exec();
    return stables;
  }

  async create(stable: CreateStableDto, userId: string): Promise<Stable> {
    const character = await this.characterModel.findOne({ userId });
  
    if (!character) {
      throw new BadRequestException('You must create a Character before creating a Stable.');
    }
  
    const createdStable = await (await new this.stableModel({
      ...stable,
      characterId: character._id,
    })).save();
  
    await this.neo4jService.write(stableCypher.addStable, {
      id: createdStable._id.toString(),
      name: createdStable.name,
      location: createdStable.location,
      characterId: character._id.toString(),
    });
  
    return createdStable;
  }  

  async update(id: string, stable: Stable, userId: string): Promise<Stable> {
    const existingStable = await this.stableModel.findById(id).exec();
  
    if (!existingStable) {
      throw new NotFoundException('Stable not found');
    }
  
    const character = await this.characterModel.findOne({ userId }).exec();
  
    if (!character || existingStable.characterId.toString() !== character._id.toString()) {
      throw new ForbiddenException('You are not allowed to update this stable');
    }
  
    const updatedStable = await this.stableModel.findByIdAndUpdate(id, stable, { new: true }).exec();
  
    await this.neo4jService.write(stableCypher.updateStable, {
      id: updatedStable._id.toString(),
      name: updatedStable.name,
      location: updatedStable.location,
    });
  
    return updatedStable;
  }
  
  async delete(id: string, userId: string): Promise<Stable> {
    const existingStable = await this.stableModel.findById(id).exec();
  
    if (!existingStable) {
      throw new NotFoundException('Stable not found');
    }
  
    const character = await this.characterModel.findOne({ userId }).exec();
  
    if (!character || existingStable.characterId.toString() !== character._id.toString()) {
      throw new ForbiddenException('You are not allowed to delete this stable');
    }
  
    const deletedStable = await this.stableModel.findByIdAndDelete(id).exec();
  
    await this.neo4jService.write(stableCypher.removeStable, { id });
  
    return deletedStable;
  }  
}