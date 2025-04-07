import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsMongoId } from 'class-validator';

export type StableDocument = Stable & Document;

@Schema()
export class Stable {
  @IsMongoId()
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;
}

export const StableSchema = SchemaFactory.createForClass(Stable);
