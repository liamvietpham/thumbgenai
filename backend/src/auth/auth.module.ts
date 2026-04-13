import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SessionModule } from 'src/session/session.module';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenGuard],
  exports: [AccessTokenGuard, JwtModule],
  imports: [UsersModule, SessionModule, JwtModule.register({})]
})
export class AuthModule {}
