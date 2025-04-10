import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './schemas/character.schema';
import { Horse, HorseSchema } from '../horse/schemas/horse.schema'; // ✅ Add this
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: Horse.name, schema: HorseSchema },
    ]),
  ],
  providers: [CharacterService],
  controllers: [CharacterController],
  exports: [CharacterService],
})
export class CharacterModule {}
