import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  providers: [UsersRepository],
  exports: [UsersRepository],
  imports: [DatabaseModule],
})
export class UsersModule {}
