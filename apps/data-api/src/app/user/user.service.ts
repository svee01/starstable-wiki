import { Injectable, ForbiddenException, HttpException } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Neo4jService } from '../neo4j/neo4j.service';
import { userCypher } from './neo4j/user.cypher';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async getAll() {
    const users = await this.userModel.find().exec();
    return { results: users };
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id).exec();
    return { results: user };
  }

  async getUserByUsername(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return { results: user };
  }

  async addUser(user: User) {
    try {
      user.password = await bcrypt.hash(user.password, 10);

      const createdUser = await new this.userModel(user).save();

      await this.neo4jService.write(userCypher.addUser, {
        id: createdUser.id || createdUser._id.toString(),
        name: createdUser.name,
        email: createdUser.email,
        password: createdUser.password,
        role: createdUser.role,
      });

      return createdUser;
    } catch (error) {
      console.log('Error creating user: ', error);
      if (error.code === 11000) {
        if (error.keyPattern?.email) {
          throw new HttpException('Email is already taken', 400);
        }
      }
      throw new HttpException('Error creating user', 500);
    }
  }

  async updateUser(updatedUser: User, tokenUserId: string) {
    if (updatedUser._id !== tokenUserId) {
      throw new ForbiddenException('You are not authorized to update this user');
    }

    const user = await this.userModel
      .findByIdAndUpdate(updatedUser._id, updatedUser, { new: true })
      .exec();

    await this.neo4jService.write(userCypher.updateUser, {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      role: updatedUser.role,
    });

    return user;
  }

  async deleteUser(userId: string, tokenUserId: string) {
    if (userId !== tokenUserId) {
      throw new ForbiddenException('You are not authorized to delete this user');
    }

    await this.userModel.findByIdAndDelete(userId).exec();

    await this.neo4jService.write(userCypher.removeUser, { id: userId });

    return { message: 'User deleted' };
  }
}
