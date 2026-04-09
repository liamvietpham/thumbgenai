import {
  Controller,
  Get,
  INestApplication,
  Module,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter';

type ErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string | string[];
  details?: {
    provider: string;
    finishReason: string;
  };
  path: string;
  timestamp: string;
};

@Controller('errors')
class ErrorsController {
  @Get('details')
  getDetails() {
    throw new UnprocessableEntityException({
      message: 'Vertex AI blocked the prompt',
      details: {
        provider: 'vertex',
        finishReason: 'SAFETY',
      },
    });
  }
}

@Module({
  controllers: [ErrorsController],
})
class TestErrorsModule {}

describe('AllExceptionsFilter (e2e)', () => {
  let app: INestApplication;
  let baseUrl: string;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestErrorsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

    await app.listen(0, '127.0.0.1');
    baseUrl = await app.getUrl();
  });

  it('preserves exception details in the HTTP error response', async () => {
    const response = await fetch(`${baseUrl}/errors/details`);
    const body = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(422);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(422);
    expect(body.message).toBe('Vertex AI blocked the prompt');
    expect(body.details).toEqual({
      provider: 'vertex',
      finishReason: 'SAFETY',
    });
    expect(body.path).toBe('/errors/details');
    expect(typeof body.timestamp).toBe('string');
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });
});
