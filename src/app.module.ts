import { PrismaModule } from './shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AwsModule } from './modules/aws/aws.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    AwsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
