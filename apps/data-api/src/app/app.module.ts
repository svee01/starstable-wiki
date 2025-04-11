import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StableController } from './stable/stable.controller';
import { CharacterController } from './character/character.controller';
import { HorseController } from './horse/horse.controller';
import { AuthController } from './auth/auth.controller';
import { HorseModule } from './horse/horse.module';
import { CharacterModule } from './character/character.module';
import { StableModule } from './stable/stable.module';
import { AuthModule } from './auth/auth.module';
import { Neo4jScheme } from './neo4j/neo4j.config.interface';
import { Neo4jModule } from './neo4j/neo4j.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_CONN || "mongodb://localhost:27017/clientside"),
    Neo4jModule.forRootAsync({
      scheme: process.env.NEO4J_SCHEME as Neo4jScheme,
      host: process.env.NEO4J_HOST,
      username: process.env.NEO4J_USR,
      password: process.env.NEO4J_PWD,
      database: process.env.NEO4J_DATABASE,
    }),
    CharacterModule,
    HorseModule,
    StableModule,
    AuthModule,
  ],
  controllers: [
    HorseController,
    CharacterController,
    StableController,
    AuthController,
  ],
  providers: [],
})
export class AppModule {}
