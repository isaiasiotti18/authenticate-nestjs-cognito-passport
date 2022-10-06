import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AwsModule } from './modules/aws/aws.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormAsyncConfig } from './shared/database/typeorm/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeormAsyncConfig),
    AuthModule,
    UsersModule,
    AwsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
