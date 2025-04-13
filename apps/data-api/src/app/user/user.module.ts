import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema';
import { Character, CharacterSchema } from '../character/schemas/character.schema';
import { Horse, HorseSchema } from '../horse/schemas/horse.schema';
import { Stable, StableSchema } from '../stable/schemas/stable.schema';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Neo4jModule } from '../neo4j/neo4j.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Character.name, schema: CharacterSchema },
      { name: Horse.name, schema: HorseSchema },
      { name: Stable.name, schema: StableSchema },
    ]),
    Neo4jModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}