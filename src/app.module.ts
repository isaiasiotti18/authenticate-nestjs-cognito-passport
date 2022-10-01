import { PrismaModule } from './shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './shared/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
