import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enables API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(process.env.APP_DESCRIPTION)
    .setVersion(process.env.API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
  });

  app.enableCors();
  app.setGlobalPrefix("/backend")

  try {
    SwaggerModule.setup('/api', app, document, {
      swaggerOptions: {
        baseUrl: '/backend/v1',
      },
    });
  } catch (error) {
    this.logger.error(error);
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
