import { Injectable, ForbiddenException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Neo4jService } from '../neo4j/neo4j.service';
import { userCypher } from './neo4j/user.cypher';

@Injectable()
export class UserService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getAll() {
    const result = await this.neo4jService.read(userCypher.getAllUsers, {});
    const users = result.records.map((record) => record.get('user').properties);
    return { results: users };
  }

  async getUserByUsername(username: string) {
    const result = await this.neo4jService.read(userCypher.getUserByUsername, { username });
    const record = result.records[0];
    return { results: record.get('user').properties };
  }

  async getUserById(id: string) {
    const result = await this.neo4jService.read(userCypher.getUserById, { id });
    const record = result.records[0];
    return { results: record.get('user').properties };
  }

  async addUser(user: User) {
    await this.neo4jService.write(userCypher.addUser, user);
    return user;
  }

  async updateUser(updatedUser: User, userId: string) {
    if (updatedUser._id !== userId) {
      throw new ForbiddenException('You are not authorized to update this user');
    }
    await this.neo4jService.write(userCypher.updateUser, updatedUser);
    return updatedUser;
  }

  async deleteUser(userId: string, tokenUserId: string) {
    if (userId !== tokenUserId) {
      throw new ForbiddenException('You are not authorized to delete this user');
    }
    await this.neo4jService.write(userCypher.removeUser, { id: userId });
    return { message: 'User deleted' };
  }
}
