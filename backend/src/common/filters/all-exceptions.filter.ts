import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let details: unknown;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const response = exception.getResponse();

      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && response !== null) {
        const responseBody = response as {
          message?: string | string[];
          details?: unknown;
        };

        message = responseBody.message ?? message;
        details = responseBody.details;
      }
    }

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    httpAdapter.reply(
      response,
      {
        success: false,
        statusCode,
        message,
        ...(details !== undefined ? { details } : {}),
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(request) as string
      },
      statusCode
    );
  }
}
