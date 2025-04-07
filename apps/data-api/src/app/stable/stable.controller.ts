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
import { Stable } from './schemas/stable.schema';
import { StableService } from './stable.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('stable')
@ApiTags('Stable')
export class StableController {
  constructor(private readonly stableService: StableService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of stables' })
  getAll() {
    return this.stableService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Stable by id' })
  getStableById(@Param('id') id: string) {
    return this.stableService.getById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Stable created successfully' })
  addStable(@Body() stable: Stable) {
    return this.stableService.addStable(stable);
  }

  @Put()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Stable updated successfully' })
  updateStable(@Body() stable: Stable, @InjectToken() token: Token) {
    return this.stableService.updateStable(stable, token.sub);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 204, description: 'Stable deleted successfully' })
  deleteStable(@Body() stable: Stable, @InjectToken() token: Token) {
    return this.stableService.deleteStable(stable._id, token.sub);
  }
}
