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
import { Horse } from './schemas/horse.schema';
import { HorseService } from './horse.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('horse')
@ApiTags('Horse')
export class HorseController {
  constructor(private readonly horseService: HorseService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of horses' })
  getAll() {
    return this.horseService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Horse by id' })
  getHorseById(@Param('id') id: string) {
    return this.horseService.getById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Horse created successfully' })
  addHorse(@Body() horse: Horse) {
    return this.horseService.addHorse(horse);
  }

  @Put()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Horse updated successfully' })
  updateHorse(@Body() horse: Horse, @InjectToken() token: Token) {
    return this.horseService.updateHorse(horse, token.sub);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 204, description: 'Horse deleted successfully' })
  deleteHorse(@Body() horse: Horse, @InjectToken() token: Token) {
    return this.horseService.deleteHorse(horse._id, token.sub);
  }
}
