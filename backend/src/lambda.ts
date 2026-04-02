import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import type { RequestListener } from 'http';
import { AppModule } from './app.module';

type LambdaCallback = (...args: unknown[]) => void;
type LambdaHandler = (
  event: unknown,
  context: unknown,
  callback: LambdaCallback,
) => Promise<unknown>;

let cachedServer: LambdaHandler | undefined;

async function bootstrap(): Promise<LambdaHandler> {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance() as RequestListener;
  return serverlessExpress({ app: expressApp }) as LambdaHandler;
}

export const handler: LambdaHandler = async (event, context, callback) => {
  cachedServer ??= await bootstrap();
  return cachedServer(event, context, callback);
};
