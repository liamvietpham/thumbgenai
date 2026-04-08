import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SessionRepository } from 'src/session/session.repository';

@Module({
  providers: [SessionRepository],
  exports: [SessionRepository],
  imports: [DatabaseModule],
})
export class SessionModule {}
