import type { OpenAPIObject } from '@nestjs/swagger';
import { patchAuthRegisterOpenApi } from 'src/common/swagger/auth/register';

export function applyOpenApiPatches(document: OpenAPIObject): OpenAPIObject {
  patchAuthRegisterOpenApi(document);
  return document;
}
