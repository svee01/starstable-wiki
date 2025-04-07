import { Module } from '@nestjs/common';
import { HorseController } from './horse.controller';
import { HorseService } from './horse.service';

@Module({
  controllers: [HorseController],
  providers: [HorseService],
  exports: [HorseService],
})
export class HorseModule {}
