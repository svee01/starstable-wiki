import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { StableService } from './stable.service';
import { Stable } from './schemas/stable.schema';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { CreateStableDto } from './schemas/stable.dto';

@Controller('stable')
export class StableController {
  constructor(private readonly stableService: StableService) {}

  @Get()
  getAll() {
    return this.stableService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.stableService.getById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() stable: CreateStableDto) {
    return this.stableService.create(stable);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() stable: CreateStableDto) {
    return this.stableService.update(id, stable);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.stableService.delete(id);
  }
}
