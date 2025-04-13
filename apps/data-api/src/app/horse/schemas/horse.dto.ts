import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHorseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsNumber()
  age: number;
}
