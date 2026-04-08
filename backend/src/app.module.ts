import { Module } from '@nestjs/common';
import { HealthModule } from 'src/health/health.module';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filters/all-exceptions.filter';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { SessionModule } from './session/session.module';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  imports: [
    HealthModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    SessionModule,
  ],
})
export class AppModule {}
