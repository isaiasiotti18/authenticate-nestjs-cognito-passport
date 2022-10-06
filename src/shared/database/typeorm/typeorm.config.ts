import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeormAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: 'localhost',
      port: parseInt(configService.get('TYPEORM_PORT')),
      username: configService.get('TYPEORM_USERNAME'),
      password: configService.get('TYPEORM_PASSWORD'),
      database: configService.get('TYPEORM_DATABASE'),
      logging: true,
      entities: [__dirname + '/../../../modules/**/entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      extra: {
        charset: 'uft8mb4_unicode_ci',
      },
    };
  },
};
