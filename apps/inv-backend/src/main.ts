import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enables API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  app.setGlobalPrefix("/backend")
  await app.listen(3000);
}
bootstrap();
