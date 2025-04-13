import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Stable, StableSchema } from './schemas/stable.schema';
import { StableService } from './stable.service';
import { StableController } from './stable.controller';
import { Character, CharacterSchema } from '../character/schemas/character.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Stable.name, schema: StableSchema },
    { name: Character.name, schema: CharacterSchema },
  ])],
  providers: [StableService],
  controllers: [StableController],
  exports: [StableService],
})
export class StableModule {}
