import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { StableService } from './stable.service';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { CreateStableDto } from './schemas/stable.dto';
import { InjectToken, Token } from '../auth/token.decorator';

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
  create(@Body() stable: CreateStableDto, @InjectToken() token: Token) {
    return this.stableService.create(stable, token.sub);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() stable: CreateStableDto, @InjectToken() token: Token) {
    return this.stableService.update(id, stable, token.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string, @InjectToken() token: Token) {
    return this.stableService.delete(id, token.sub);
  }
}