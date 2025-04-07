import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Character } from '../../character/schemas/character.schema';
import { IsMongoId } from 'class-validator';

export type HorseDocument = Horse & Document;

@Schema()
export class Horse {
  @IsMongoId()
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  age: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Character' })
  characterId: string;

  character?: Character;
}

export const HorseSchema = SchemaFactory.createForClass(Horse);
