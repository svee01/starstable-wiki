import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './schemas/character.schema';
import { Horse, HorseSchema } from '../horse/schemas/horse.schema';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Stable, StableSchema } from '../stable/schemas/stable.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: Horse.name, schema: HorseSchema },
      { name: Stable.name, schema: StableSchema },
    ]),
  ],
  providers: [CharacterService],
  controllers: [CharacterController],
  exports: [CharacterService],
})
export class CharacterModule {}
