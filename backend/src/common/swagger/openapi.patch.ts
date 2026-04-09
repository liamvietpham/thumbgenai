import type { OpenAPIObject } from '@nestjs/swagger';
import { patchAuthLoginOpenApi } from 'src/common/swagger/auth/login';
import { patchAuthLogoutOpenApi } from 'src/common/swagger/auth/logout';
import { patchAuthRefreshOpenApi } from 'src/common/swagger/auth/refresh';
import { patchAuthRegisterOpenApi } from 'src/common/swagger/auth/register';
import { patchHealthStatusOpenApi } from 'src/common/swagger/health/status';

export function applyOpenApiPatches(document: OpenAPIObject): OpenAPIObject {
  patchHealthStatusOpenApi(document);
  patchAuthRegisterOpenApi(document);
  patchAuthLoginOpenApi(document);
  patchAuthLogoutOpenApi(document);
  patchAuthRefreshOpenApi(document);
  return document;
}
