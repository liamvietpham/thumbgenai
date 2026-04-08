import type { OpenAPIObject } from '@nestjs/swagger';
import { patchAuthLoginOpenApi } from 'src/common/swagger/auth/login';
import { patchAuthRegisterOpenApi } from 'src/common/swagger/auth/register';

export function applyOpenApiPatches(document: OpenAPIObject): OpenAPIObject {
  patchAuthRegisterOpenApi(document);
  patchAuthLoginOpenApi(document);
  return document;
}
