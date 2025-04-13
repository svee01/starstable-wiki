import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HorseService } from './horse.service';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { CreateHorseDto } from './schemas/horse.dto';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('horse')
export class HorseController {
  constructor(private readonly horseService: HorseService) {}

  @Get()
  getAll() {
    return this.horseService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.horseService.getById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() horse: CreateHorseDto, @InjectToken() token: Token) {
    return this.horseService.create(horse, token.sub);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() horse: CreateHorseDto,
    @InjectToken() token: Token
  ) {
    return this.horseService.update(id, horse, token.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string, @InjectToken() token: Token) {
    return this.horseService.delete(id, token.sub);
  }
}