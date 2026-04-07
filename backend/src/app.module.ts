import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filters/all-exceptions.filter';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

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
  ],
})
export class AppModule {}
