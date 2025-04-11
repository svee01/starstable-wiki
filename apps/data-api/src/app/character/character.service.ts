import { Injectable, ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';
import { Model } from 'mongoose';
import { Neo4jService } from '../neo4j/neo4j.service';
import { characterCypher } from './neo4j/character.cypher';
import { Horse, HorseDocument } from '../horse/schemas/horse.schema';
import { horseCypher } from '../horse/neo4j/horse.cypher';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
    @InjectModel(Horse.name) private horseModel: Model<HorseDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async getAll(): Promise<{ results: Character[] }> {
    const characters = await this.characterModel.find()
      .populate('userId')
      .populate('stableId')
      .exec();
    return { results: characters };
  }

  async getById(id: string): Promise<{ results: Character }> {
    const character = await this.characterModel.findById(id)
      .populate('userId')
      .populate('stableId')
      .exec();
    return { results: character };
  }

  async getHorsesByCharacterId(characterId: string): Promise<{ results: Horse[] }> {
    const horses = await this.horseModel.find({ characterId }).exec();
    return { results: horses };
  }

  async getStableByCharacterId(characterId: string): Promise<{ results: string }> {
    const character = await this.characterModel.findById(characterId).populate('stableId').exec();
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return { results: character.stableId };
  }

  async create(character: Character): Promise<Character> {
    const existingCharacter = await this.characterModel.findOne({ userId: character.userId }).exec();
    if (existingCharacter) {
      throw new BadRequestException('User already has a character');
    }

    const createdCharacter = await (await new this.characterModel(character)).save();

    await this.neo4jService.write(characterCypher.addCharacter, {
      id: createdCharacter._id.toString(),
      name: createdCharacter.name,
      ridingSkill: createdCharacter.ridingSkill,
      userId: createdCharacter.userId.toString(),
      stableId: createdCharacter.stableId.toString(),
    });

    const existingHorse = await this.horseModel.findOne({ characterId: createdCharacter._id }).exec();

    if (!existingHorse) {
      const defaultHorse = await (await new this.horseModel({
        name: 'Starter Horse',
        breed: 'Jorvik Warmblood',
        age: 1,
        characterId: createdCharacter._id,
      })).save();

      await this.neo4jService.write(horseCypher.addHorse, {
        id: defaultHorse._id.toString(),
        name: defaultHorse.name,
        breed: defaultHorse.breed,
        age: defaultHorse.age,
        characterId: createdCharacter._id.toString(),
      });
    }

    return createdCharacter;
  }  

  async update(id: string, character: Character, userId: string): Promise<Character> {
    const existingCharacter = await this.characterModel.findById(id).exec();

    if (!existingCharacter || existingCharacter.userId.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to update this character');
    }

    const updatedCharacter = await this.characterModel.findByIdAndUpdate(id, character, { new: true }).exec();
    await this.neo4jService.write(characterCypher.updateCharacter, {
      id: updatedCharacter._id.toString(),
      name: updatedCharacter.name,
      ridingSkill: updatedCharacter.ridingSkill,
    });
    return updatedCharacter;
  }

  async delete(id: string, userId: string): Promise<Character> {
    const existingCharacter = await this.characterModel.findById(id).exec();

    if (!existingCharacter || existingCharacter.userId.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to delete this character');
    }

    const deletedCharacter = await this.characterModel.findByIdAndDelete(id).exec();
    await this.neo4jService.write(characterCypher.removeCharacter, { id });
    return deletedCharacter;
  }
}
