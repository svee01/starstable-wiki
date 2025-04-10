import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Horse, HorseSchema } from './schemas/horse.schema';
import { HorseService } from './horse.service';
import { HorseController } from './horse.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Horse.name, schema: HorseSchema }])],
  providers: [HorseService],
  controllers: [HorseController],
  exports: [HorseService],
})
export class HorseModule {}
