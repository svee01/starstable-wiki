import { Logger, ValidationPipe } from '@nestjs/common';  // 🆕 import ValidationPipe
import { NestFactory } from '@nestjs/core';

import { ApiResponseInterceptor } from '@starstable-wiki/backend/dto';

import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const corsOptions: CorsOptions = {};
  app.enableCors(corsOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,    // only allow properties that are in the DTO
      forbidNonWhitelisted: true, // throw error if extra properties are sent
      transform: true,    // automatically transform payloads to DTO instances
    })
  );

  app.useGlobalInterceptors(new ApiResponseInterceptor());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
