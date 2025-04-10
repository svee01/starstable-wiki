import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';
import { Model } from 'mongoose';
import { Neo4jService } from '../neo4j/neo4j.service';
import { characterCypher } from './neo4j/character.cypher';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async getAll() {
    const characters = await this.characterModel.find()
      .populate('userId')
      .populate('stableId')
      .exec();
    return { results: characters };
  }

  async getById(id: string) {
    const character = await this.characterModel.findById(id)
      .populate('userId')
      .populate('stableId')
      .exec();
    return { results: character };
  }

  async create(character: Character) {
    const createdCharacter = await (await new this.characterModel(character)).save();
    await this.neo4jService.write(characterCypher.addCharacter, {
      id: createdCharacter._id.toString(),
      name: createdCharacter.name,
      ridingSkill: createdCharacter.ridingSkill,
      userId: createdCharacter.userId.toString(),   // ✅ FIX
      stableId: createdCharacter.stableId.toString() // ✅ FIX
    });    
    return createdCharacter;
  }

  async update(id: string, character: Character) {
    const updatedCharacter = await this.characterModel.findByIdAndUpdate(id, character, { new: true }).exec();
    await this.neo4jService.write(characterCypher.updateCharacter, {
      id: updatedCharacter._id.toString(),
      name: updatedCharacter.name,
      ridingSkill: updatedCharacter.ridingSkill,
    });
    return updatedCharacter;
  }

  async delete(id: string) {
    const deletedCharacter = await this.characterModel.findByIdAndDelete(id).exec();
    await this.neo4jService.write(characterCypher.removeCharacter, { id });
    return deletedCharacter;
  }
}
