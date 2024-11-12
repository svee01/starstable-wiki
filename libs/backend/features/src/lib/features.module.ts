import { Module } from '@nestjs/common';
import { MealController } from './libs/backend/features/src/lib/meal/meal.controller';

@Module({
  controllers: [MealController],
  providers: [],
  exports: [],
})
export class FeaturesModule {}
