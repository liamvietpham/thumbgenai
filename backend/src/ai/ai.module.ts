import { Module } from '@nestjs/common';
import { VertexProvider } from 'src/ai/providers/vertex.provider';

@Module({
  providers: [VertexProvider],
  exports: [VertexProvider],
})
export class AiModule {}
