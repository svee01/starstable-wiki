import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStableDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}
