import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Horse, HorseSchema } from './schemas/horse.schema';
import { HorseService } from './horse.service';
import { HorseController } from './horse.controller';
import { Character, CharacterSchema } from '../character/schemas/character.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Horse.name, schema: HorseSchema },
    { name: Character.name, schema: CharacterSchema }
  ])],
  providers: [HorseService],
  controllers: [HorseController],
  exports: [HorseService],
})
export class HorseModule {}
