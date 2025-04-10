import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
