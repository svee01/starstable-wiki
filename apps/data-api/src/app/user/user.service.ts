import { Injectable, ForbiddenException, HttpException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './schemas/user.dto';
import { Neo4jService } from '../neo4j/neo4j.service';
import { userCypher } from './neo4j/user.cypher';

import { Character, CharacterDocument } from '../character/schemas/character.schema';
import { Horse, HorseDocument } from '../horse/schemas/horse.schema';
import { Stable, StableDocument } from '../stable/schemas/stable.schema';
import { characterCypher } from '../character/neo4j/character.cypher';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
    @InjectModel(Horse.name) private horseModel: Model<HorseDocument>,
    @InjectModel(Stable.name) private stableModel: Model<StableDocument>,
    private readonly neo4jService: Neo4jService,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async getUserByUsername(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async addUser(userData: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const createdUser = await new this.userModel({
        ...userData,
        password: hashedPassword,
      }).save();

      await this.neo4jService.write(userCypher.addUser, {
        id: createdUser._id.toString(),
        name: createdUser.name,
        email: createdUser.email,
        password: createdUser.password,
        role: createdUser.role,
      });

      return createdUser;
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.code === 11000 && error.keyPattern?.email) {
        throw new HttpException('Email is already taken', 400);
      }
      throw new HttpException('Error creating user', 500);
    }
  }

  async getCharacterByUserId(userId: string): Promise<Character> {
    return this.characterModel.findOne({ userId }).populate('stableId').exec();
  }

  async updateUser(updatedUser: CreateUserDto, tokenUserId: string): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(tokenUserId, updatedUser, { new: true })
      .exec();
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    await this.neo4jService.write(userCypher.updateUser, {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  
    return user;
  }  

  async deleteUser(userId: string, tokenUserId: string): Promise<{ message: string }> {
    if (userId !== tokenUserId) {
      throw new ForbiddenException('You are not authorized to delete this user');
    }

    const character = await this.characterModel.findOne({ userId }).exec();

    if (character) {
      await this.horseModel.deleteMany({ characterId: character._id }).exec();
      await this.stableModel.deleteMany({ characterId: character._id }).exec();
      await this.characterModel.findByIdAndDelete(character._id).exec();

      await this.neo4jService.write(`
        MATCH (h:Horse {characterId: $characterId})
        DETACH DELETE h
      `, { characterId: character._id.toString() });

      await this.neo4jService.write(`
        MATCH (s:Stable {characterId: $characterId})
        DETACH DELETE s
      `, { characterId: character._id.toString() });

      await this.neo4jService.write(characterCypher.removeCharacter, { id: character._id.toString() });
    }

    await this.userModel.findByIdAndDelete(userId).exec();

    await this.neo4jService.write(userCypher.removeUser, { id: userId });

    return { message: 'User and all related data deleted' };
  }
}