import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { CreateCharacterDto } from './schemas/character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  getAll() {
    return this.characterService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.characterService.getById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() character: CreateCharacterDto) {
    return this.characterService.create(character);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() character: CreateCharacterDto) {
    return this.characterService.update(id, character);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.characterService.delete(id);
  }
}
