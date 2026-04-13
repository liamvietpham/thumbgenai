import { ArgumentsHost, UnprocessableEntityException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';

describe('AllExceptionsFilter', () => {
  it('preserves details from HttpException responses', () => {
    const reply = jest.fn();
    const getRequestUrl = jest.fn().mockReturnValue('/images/preview');
    const request = {};
    const response = {};

    const httpAdapterHost = {
      httpAdapter: {
        reply,
        getRequestUrl
      }
    } as unknown as HttpAdapterHost;

    const host = {
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: () => response
      })
    } as ArgumentsHost;

    const filter = new AllExceptionsFilter(httpAdapterHost);

    filter.catch(
      new UnprocessableEntityException({
        message: 'Vertex AI blocked the prompt',
        details: {
          provider: 'vertex',
          finishReason: 'SAFETY'
        }
      }),
      host
    );

    expect(getRequestUrl).toHaveBeenCalledWith(request);
    expect(reply).toHaveBeenCalledWith(
      response,
      expect.objectContaining({
        success: false,
        statusCode: 422,
        message: 'Vertex AI blocked the prompt',
        details: {
          provider: 'vertex',
          finishReason: 'SAFETY'
        },
        path: '/images/preview'
      }),
      422
    );
  });
});
