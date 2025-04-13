import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { CreateCharacterDto } from './schemas/character.dto';
import { InjectToken, Token } from '../auth/token.decorator';

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

  @Get(':id/details')
  @UseGuards(AuthGuard)
  getCharacterDetails(@Param('id') id: string) {
    return this.characterService.getHorsesAndStableByCharacterId(id);
  }

  @Get(':id/horses')
  @UseGuards(AuthGuard)
  getHorses(@Param('id') characterId: string) {
    return this.characterService.getHorsesByCharacterId(characterId);
  }

  @Get(':id/stable')
  @UseGuards(AuthGuard)
  getStable(@Param('id') characterId: string) {
    return this.characterService.getStableByCharacterId(characterId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() character: CreateCharacterDto, @InjectToken() token: Token) {
    return this.characterService.update(id, character, token.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string, @InjectToken() token: Token) {
    return this.characterService.delete(id, token.sub);
  }
}
