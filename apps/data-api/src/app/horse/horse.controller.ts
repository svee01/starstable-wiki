import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HorseService } from './horse.service';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { CreateHorseDto } from './schemas/horse.dto';

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
  create(@Body() horse: CreateHorseDto) {
    return this.horseService.create(horse);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() horse: CreateHorseDto) {
    return this.horseService.update(id, horse);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)  // 🛡️ Only logged-in users can delete
  delete(@Param('id') id: string) {
    return this.horseService.delete(id);
  }
}
