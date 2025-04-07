import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Character } from './schemas/character.schema';
import { CharacterService } from './character.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('character')
@ApiTags('Character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of characters' })
  getAll() {
    return this.characterService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Character by id' })
  getCharacterById(@Param('id') id: string) {
    return this.characterService.getById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Character created successfully' })
  addCharacter(@Body() character: Character) {
    return this.characterService.addCharacter(character);
  }

  @Put()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Character updated successfully' })
  updateCharacter(@Body() character: Character, @InjectToken() token: Token) {
    return this.characterService.updateCharacter(character, token.sub);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 204, description: 'Character deleted successfully' })
  deleteCharacter(@Body() character: Character, @InjectToken() token: Token) {
    return this.characterService.deleteCharacter(character._id, token.sub);
  }
}
