import {
  BadRequestException,
  ValidationPipe,
  type INestApplication,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { applyOpenApiPatches } from 'src/common/swagger/openapi.patch';
import cookieParser from 'cookie-parser';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints ?? {}),
        );

        return new BadRequestException(messages);
      },
    }),
  );

  const openApiConfig = new DocumentBuilder()
    .setTitle('ThumbgenAI API')
    .setDescription('API Reference')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const baseDocument = SwaggerModule.createDocument(app, openApiConfig);
  const document = applyOpenApiPatches(baseDocument);

  if (process.env.NODE_ENV !== 'test') {
    const { apiReference } = await import('@scalar/nestjs-api-reference');

    app.use(
      '/api-docs',
      apiReference({
        content: document,
        title: 'ThumbgenAI API Reference',
        theme: 'default',
        layout: 'modern',
        authentication: { preferredSecurityScheme: 'bearerAuth' },
        hideModels: true,
      }),
    );
  }

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });

  return app;
}
