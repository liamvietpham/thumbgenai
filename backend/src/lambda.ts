import serverlessExpress from '@vendia/serverless-express';
import type { Callback, Context } from 'aws-lambda';
import type { RequestListener } from 'http';
import { createApp } from './app.factory';

type LambdaHandler = (
  event: unknown,
  context: Context,
  callback: Callback<unknown>
) => void | Promise<unknown>;

let cachedServer: LambdaHandler | undefined;

async function bootstrap(): Promise<LambdaHandler> {
  const app = await createApp();
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance() as RequestListener;
  return serverlessExpress({ app: expressApp }) as LambdaHandler;
}

export const handler: LambdaHandler = async (event, context, callback) => {
  cachedServer ??= await bootstrap();
  return cachedServer(event, context, callback);
};
