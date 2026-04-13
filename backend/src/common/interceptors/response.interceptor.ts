import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Response } from 'express';
import { map, Observable } from 'rxjs';

type SuccessResponse = {
  success: true;
  statusCode: number;
  data: unknown;
};

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponse> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data: unknown) => ({
        success: true,
        statusCode: response.statusCode,
        data
      }))
    );
  }
}
