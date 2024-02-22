import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enables API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  app.setGlobalPrefix("/backend")

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
