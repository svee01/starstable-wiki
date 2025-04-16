import { Injectable, ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';
import { Model } from 'mongoose';
import { Neo4jService } from '../neo4j/neo4j.service';
import { characterCypher } from './neo4j/character.cypher';
import { Horse, HorseDocument } from '../horse/schemas/horse.schema';
import { Stable, StableDocument } from '../stable/schemas/stable.schema';
import { stableCypher } from '../stable/neo4j/stable.cypher';
import { CreateCharacterDto } from './schemas/character.dto';
import { horseCypher } from '../horse/neo4j/horse.cypher';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
    @InjectModel(Horse.name) private horseModel: Model<HorseDocument>,
    @InjectModel(Stable.name) private stableModel: Model<StableDocument>,
    private readonly neo4jService: Neo4jService,
  ) {}

  async getAll(): Promise<Character[]> {
    return this.characterModel.find()
      .populate('userId')
      .populate('stableId')
      .exec();
  }

  async getCharacterByUserId(userId: string): Promise<Character> {
    const character = await this.characterModel.findOne({ userId }).populate('userId').populate('stableId').exec();
    if (!character) {
      throw new NotFoundException('Character not found for this user');
    }
    return character;
  }  

  async getById(id: string): Promise<Character> {
    return this.characterModel.findById(id)
      .populate('userId')
      .populate('stableId')
      .exec();
  }

  async getHorsesByCharacterId(characterId: string): Promise<Horse[]> {
    return this.horseModel.find({ characterId }).exec();
  }

  async getStableByCharacterId(characterId: string): Promise<any> {
    const character = await this.characterModel.findById(characterId).populate('stableId').exec();
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return character.stableId;
  }

  async create(dto: CreateCharacterDto, userId: string): Promise<Character> {
    const existingCharacter = await this.characterModel.findOne({ userId }).exec();
    if (existingCharacter) {
      throw new BadRequestException('User already has a character');
    }
  
    const createdCharacter = await (await new this.characterModel({
      name: dto.name,
      ridingSkill: dto.ridingSkill,
      userId,
    })).save();
  
    const newStable = await (await new this.stableModel({
      name: 'Default Stable',
      location: 'Unknown',
      characterId: createdCharacter._id,
    })).save();
  
    createdCharacter.stableId = newStable._id;
    await createdCharacter.save();
  
    await this.neo4jService.write(characterCypher.addCharacter, {
      id: createdCharacter._id.toString(),
      name: createdCharacter.name,
      ridingSkill: createdCharacter.ridingSkill,
      userId: userId,
      stableId: newStable._id.toString(),
    });
  
    await this.neo4jService.write(stableCypher.addStable, {
      id: newStable._id.toString(),
      name: newStable.name,
      location: newStable.location,
      characterId: createdCharacter._id.toString(),
    });
  
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
  
    return createdCharacter;
  }

  async getHorsesAndStableByCharacterId(characterId: string) {
    const result = await this.neo4jService.read(`
      MATCH (c:Character {id: $characterId})
      OPTIONAL MATCH (c)-[:HAS_HORSE]->(h:Horse)
      OPTIONAL MATCH (c)-[:BELONGS_TO]->(s:Stable)
      RETURN c, collect(h) AS horses, s
    `, { characterId });

    if (!result.records.length) {
      throw new NotFoundException('Character not found');
    }

    const record = result.records[0];
    return {
      character: record.get('c').properties,
      horses: record.get('horses').map((h: any) => h.properties),
      stable: record.get('s')?.properties || null,
    };
  }

  async update(id: string, dto: CreateCharacterDto, userId: string): Promise<Character> {
    const existingCharacter = await this.characterModel.findById(id).exec();

    if (!existingCharacter || existingCharacter.userId.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to update this character');
    }

    const updatedCharacter = await this.characterModel.findByIdAndUpdate(id, {
      name: dto.name,
      ridingSkill: dto.ridingSkill,
      stableId: dto.stableId,
    }, { new: true }).exec();

    await this.neo4jService.write(characterCypher.updateCharacter, {
      id: updatedCharacter._id.toString(),
      name: updatedCharacter.name,
      ridingSkill: updatedCharacter.ridingSkill,
      stableId: updatedCharacter.stableId.toString(),
    });

    return updatedCharacter;
  }

  async delete(id: string, userId: string): Promise<Character> {
    const existingCharacter = await this.characterModel.findById(id).exec();

    if (!existingCharacter || existingCharacter.userId.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to delete this character');
    }

    await this.horseModel.deleteMany({ characterId: id }).exec();
    await this.stableModel.deleteMany({ characterId: id }).exec();

    await this.neo4jService.write(`
      MATCH (h:Horse)-[:OWNED_BY]->(c:Character {id: $characterId})
      DETACH DELETE h
    `, { characterId: id });

    await this.neo4jService.write(`
      MATCH (s:Stable)-[:BELONGS_TO]->(c:Character {id: $characterId})
      DETACH DELETE s
    `, { characterId: id });

    const deletedCharacter = await this.characterModel.findByIdAndDelete(id).exec();

    await this.neo4jService.write(characterCypher.removeCharacter, { id });

    return deletedCharacter;
  }
}