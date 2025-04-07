import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Stable } from '../../stable/schemas/stable.schema';
import { IsMongoId } from 'class-validator';

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @IsMongoId()
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ridingSkill: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Stable' })
  stableId: string;

  stable?: Stable;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
