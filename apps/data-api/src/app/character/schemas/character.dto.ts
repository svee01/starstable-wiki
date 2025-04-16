import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  ridingSkill: number;

  @IsString()
  stableId?: string;
}