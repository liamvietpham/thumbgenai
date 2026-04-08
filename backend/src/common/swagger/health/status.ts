import type { OpenAPIObject } from '@nestjs/swagger';
import {
  buildSuccessSchemaWithDataRef,
  ensureCommonSchemas,
} from 'src/common/swagger/shared';

const HEALTH_DATA_SCHEMA = '#/components/schemas/HealthData';

export function patchHealthStatusOpenApi(document: OpenAPIObject): void {
  ensureCommonSchemas(document);
  document.components ??= {};
  document.components.schemas ??= {};
  document.components.schemas.HealthData ??= {
    type: 'object',
    required: ['status', 'service'],
    properties: {
      status: { type: 'string', example: 'ok' },
      service: { type: 'string', example: 'thumbgen-ai-backend' },
    },
  };

  const healthOperation = document.paths?.['/health']?.get;

  if (!healthOperation) return;

  healthOperation.tags ??= ['Health'];
  healthOperation.summary ??= 'Health check';
  healthOperation.description ??= 'Return service metadata for liveness checks.';

  healthOperation.responses = {
    ...healthOperation.responses,
    '200': {
      description: 'Service health status',
      content: {
        'application/json': {
          schema: buildSuccessSchemaWithDataRef(HEALTH_DATA_SCHEMA),
          example: {
            success: true,
            statusCode: 200,
            data: {
              status: 'ok',
              service: 'thumbgen-ai-backend',
            },
          },
        },
      },
    },
  };
}
