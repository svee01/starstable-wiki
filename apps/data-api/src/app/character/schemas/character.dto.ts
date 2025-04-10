import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  ridingSkill: number;

  @IsMongoId()
  userId: string;

  @IsMongoId()
  stableId: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  horses?: string[];
}
