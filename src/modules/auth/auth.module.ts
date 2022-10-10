import { AwsModule } from './../aws/aws.module';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt ' }),
    UsersModule,
    AwsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
