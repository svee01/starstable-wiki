import { Module } from '@nestjs/common';
import { StableController } from './stable.controller';
import { StableService } from './stable.service';

@Module({
  controllers: [StableController],
  providers: [StableService],
  exports: [StableService],
})
export class StableModule {}
