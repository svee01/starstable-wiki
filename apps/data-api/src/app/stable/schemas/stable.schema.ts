import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type StableDocument = Stable & Document;

@Schema()
export class Stable {
  @IsMongoId()
  _id?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Character' })
  characterId?: string;
}

export const StableSchema = SchemaFactory.createForClass(Stable);
